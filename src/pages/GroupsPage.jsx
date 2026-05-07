
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
        <div className="pa">
          <button className="bp" onClick={onCreateGroup}>+ Create New Group</button>
        </div>
        
        {groups.length === 0 ? (
          <EmptyState icon={<MdGroup size={32} />} title="No groups yet" description="Create your first ajo group to get started." />
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
      <div className="ph">
        <button className="bs bsm" onClick={onBack}>← Back</button>
        <GroupDetailHeader group={selectedGroup} />
        <div className="pa">
          <button className="bp" onClick={onAddMember}>+ Add Member</button>
          <button className="bs" onClick={onRecordContribution}>Record Contribution</button>
        </div>
      </div>
      
      <GroupStats group={selectedGroup} />
      
      <div style={{ marginBottom: 18 }}>
        <div className="pbar" style={{ height: 7, borderRadius: 4 }}>
          <div className="pfill" style={{ width: `${progress}%`, height: 7 }}></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          <span style={{ fontSize: 11, color: "var(--ink3)", fontFamily: "var(--fm)" }}>{progress}% complete</span>
          <span style={{ fontSize: 11, color: "var(--ink3)", fontFamily: "var(--fm)" }}>{formatMoney(selectedGroup.target - selectedGroup.collected)} remaining</span>
        </div>
      </div>
      
      <Tabs tabs={["members", "activity", "chat", "schedule"]} activeTab={activeTab} onTabChange={onTabChange} />
      
      <div className="dg">
        {activeTab === "members" && <MembersTable members={selectedGroup.members} onRemoveMember={onRemoveMember} />}
        {activeTab === "activity" && (
          <div className="card" style={{ padding: "8px 16px" }}>
            <div className="af">
              {selectedGroup.activity.map((activity, i) => (
                <div key={i} className="ai">
                  <div className={`adot ${activity.type}`}></div>
                  <div>
                    <div className="at" dangerouslySetInnerHTML={{ __html: activity.text }}></div>
                    <div className="atm">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "chat" && (
          <div className="card" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="ctit">Group Chat</div>
            <div style={{ minHeight: 220, maxHeight: 260, overflowY: "auto", padding: 14, borderRadius: 16, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.025)" }}>
              {selectedGroup.messages?.length > 0 ? (
                selectedGroup.messages.map((message) => (
                  <div key={message.id} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "center" }}>
                      <strong>{message.sender}</strong>
                      <span style={{ fontSize: 11, color: "var(--ink3)" }}>{message.time}</span>
                    </div>
                    <div style={{ marginTop: 6, color: "var(--ink)" }}>{message.text}</div>
                  </div>
                ))
              ) : (
                <div className="ps">No messages yet. Start the chat with your group.</div>
              )}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="Write a message to everyone"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                style={{ flex: 1, padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "var(--ink)", minWidth: 200 }}
              />
              <button className="bp" style={{ minWidth: 120 }} onClick={() => onSendGroupChat(selectedGroup.id, chatMessage)}>Send</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="ctit">Send Contribution Reminder</div>
              <textarea
                rows={3}
                placeholder="Write reminder text for group members"
                value={reminderNote}
                onChange={(e) => setReminderNote(e.target.value)}
                style={{ width: "100%", padding: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "var(--ink)", resize: "vertical" }}
              />
              <button className="bs" onClick={() => onSendReminder(selectedGroup.id, reminderNote)}>Send Reminder</button>
              {selectedGroup.reminders?.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                  {selectedGroup.reminders.map((reminder) => (
                    <div key={reminder.id} style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.015)" }}>
                      <div style={{ fontSize: 13, color: "var(--ink3)" }}>{reminder.time}</div>
                      <div style={{ marginTop: 6 }}>{reminder.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === "schedule" && <ScheduleList members={selectedGroup.members} nextPayout={selectedGroup.nextPayout} />}
        
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card cp">
            <div className="ctit" style={{ marginBottom: 14 }}>Group Info</div>
            {[
              ["Start date", selectedGroup.startDate],
              ["Duration", selectedGroup.duration],
              ["Frequency", selectedGroup.frequency],
              ["Per contribution", formatMoney(selectedGroup.amount)]
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(42,37,32,.35)", fontSize: 13 }}>
                <span style={{ color: "var(--ink3)" }}>{label}</span>
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
          
          <div className="card cp">
            <div className="ctit" style={{ marginBottom: 12 }}>Quick Actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="bp" style={{ width: "100%" }} onClick={onRecordContribution}><MdPayments size={18} style={{ marginRight: 8 }} /> Record Contribution</button>
              <button className="bs" style={{ width: "100%" }} onClick={onAddMember}>+ Add Member</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { GroupsPage };