import { GroupCard } from "../Components/groups/GroupCard";
import { GroupDetailHeader } from "../Components/groups/GroupDetailHeader";
import { GroupStats } from "../Components/groups/GroupStats";
import { MembersTable } from "../Components/groups/MembersTable";
import { ScheduleList } from "../Components/groups/ScheduleList";
import { Tabs } from "../Components/shared/Tabs";
import { EmptyState } from "../sections/shared/EmptyState";
import { PageHeader } from "../sections/shared/PageHeader";
import { MdGroup, MdPayments } from "react-icons/md";
import { formatMoney } from "../utils/helpers";

const GroupsPage = ({ 
  groups, 
  selectedGroup, 
  onGroupSelect, 
  onCreateGroup,
  onBack,
  onAddMember,
  onRecordContribution,
  onRemoveMember,
  activeTab,
  onTabChange,
  chatMessage,
  setChatMessage,
  reminderNote,
  setReminderNote,
  onSendGroupChat,
  onSendReminder
}) => {

  // Groups List View
  if (!selectedGroup) {
    return (
      <>
        <PageHeader title="My <em>Groups</em>" subtitle="Manage all your savings circles" />
        
        <div className="pa mb-8">
          <button className="bp" onClick={onCreateGroup}>+ Create New Group</button>
        </div>
        
        {groups.length === 0 ? (
          <EmptyState 
            icon={<MdGroup size={32} />} 
            title="No groups yet" 
            description="Create your first ajo group to get started." 
          />
        ) : (
          <div className="gg">
            {groups.map(group => (
              <GroupCard key={group.id} group={group} onClick={() => onGroupSelect(group)} />
            ))}
          </div>
        )}
      </>
    );
  }

  // Group Detail View
  const progress = Math.round((selectedGroup.collected / selectedGroup.target) * 100);
  
  return (
    <>
      <div className="ph mb-8">
        <button className="bs bsm" onClick={onBack}>← Back</button>
        <GroupDetailHeader group={selectedGroup} />
        
        <div className="pa">
          <button className="bp" onClick={onAddMember}>+ Add Member</button>
          <button className="bs" onClick={onRecordContribution}>Record Contribution</button>
        </div>
      </div>
      
      <GroupStats group={selectedGroup} />
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="pbar bg-bg3 h-[7px] rounded-lg overflow-hidden">
          <div 
            className="pfill h-full bg-gradient-to-r from-gold to-gold2 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="gpt text-xs text-ink3 font-fm mt-1.5">
          <span>{progress}% complete</span>
          <span>{formatMoney(selectedGroup.target - selectedGroup.collected)} remaining</span>
        </div>
      </div>
      
      <Tabs tabs={["members", "activity", "chat", "schedule"]} activeTab={activeTab} onTabChange={onTabChange} />
      
      <div className="dg grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        
        {/* Main Content */}
        {activeTab === "members" && <MembersTable members={selectedGroup.members} onRemoveMember={onRemoveMember} />}
        
        {activeTab === "activity" && (
          <div className="card bg-card border border-border rounded-xl p-4">
            <div className="af flex flex-col">
              {selectedGroup.activity.map((activity, i) => (
                <div key={i} className="ai flex gap-4 py-4 border-b border-border/50 last:border-b-0">
                  <div className={`adot w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${activity.type === 'g' ? 'bg-green' : 'bg-gold'}`} />
                  <div>
                    <div className="at text-ink2 text-[13px]" dangerouslySetInnerHTML={{ __html: activity.text }} />
                    <div className="atm text-xs text-ink3 font-fm mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="card bg-card border border-border rounded-xl p-6 flex flex-col gap-6">
            <div className="ctit">Group Chat</div>
            
            <div className="min-h-[220px] max-h-[260px] overflow-y-auto p-5 rounded-2xl border border-border bg-bg3/50">
              {selectedGroup.messages?.length > 0 ? (
                selectedGroup.messages.map((message) => (
                  <div key={message.id} className="mb-5">
                    <div className="flex justify-between items-center">
                      <strong className="text-ink">{message.sender}</strong>
                      <span className="text-[11px] text-ink3">{message.time}</span>
                    </div>
                    <div className="mt-2 text-ink">{message.text}</div>
                  </div>
                ))
              ) : (
                <div className="ps text-ink2 py-8 text-center">No messages yet. Start the chat with your group.</div>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Write a message to everyone"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="fi flex-1 min-w-[200px]"
              />
              <button className="bp whitespace-nowrap" onClick={() => onSendGroupChat(selectedGroup.id, chatMessage)}>
                Send
              </button>
            </div>

            {/* Reminder Section */}
            <div className="pt-4 border-t border-border">
              <div className="ctit mb-4">Send Contribution Reminder</div>
              <textarea
                rows={3}
                placeholder="Write reminder text for group members"
                value={reminderNote}
                onChange={(e) => setReminderNote(e.target.value)}
                className="fta w-full"
              />
              <button className="bs mt-4" onClick={() => onSendReminder(selectedGroup.id, reminderNote)}>
                Send Reminder
              </button>
            </div>
          </div>
        )}

        {activeTab === "schedule" && <ScheduleList members={selectedGroup.members} nextPayout={selectedGroup.nextPayout} />}

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          <div className="card bg-card border border-border rounded-xl p-6">
            <div className="ctit mb-5">Group Info</div>
            {[
              ["Start date", selectedGroup.startDate],
              ["Duration", selectedGroup.duration],
              ["Frequency", selectedGroup.frequency],
              ["Per contribution", formatMoney(selectedGroup.amount)]
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-3 border-b border-border/50 last:border-b-0 text-sm">
                <span className="text-ink3">{label}</span>
                <span className="text-ink font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="card bg-card border border-border rounded-xl p-6">
            <div className="ctit mb-4">Quick Actions</div>
            <div className="flex flex-col gap-3">
              <button className="bp w-full" onClick={onRecordContribution}>
                <MdPayments size={18} className="mr-2" /> Record Contribution
              </button>
              <button className="bs w-full" onClick={onAddMember}>+ Add Member</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { GroupsPage };