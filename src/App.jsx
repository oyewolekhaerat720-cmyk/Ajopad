import { useState } from "react";
import { Toast } from "./Components/shared/Toast";
import { Navbar } from "./Components/layout/Navbar";
import { Footer } from "./Components/layout/Footer";
import { Sidebar } from "./Components/layout/Sidebar";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { GroupChatPage } from "./pages/GroupChatPage";
import { PaymentsPage } from "./pages/PaymentsPage";
import { GroupsPage } from "./pages/GroupsPage";
import { ContributionsPage } from "./pages/ContributionsPage";
import { PayoutsPage } from "./pages/PayoutsPage";
import { MembersPage } from "./pages/MembersPage";
import { SettingsPage } from "./pages/SettingsPage";
import { CreateGroupModal } from "./Components/modals/CreateGroupModal";
import { AddMemberModal } from "./Components/modals/AddMemberModal";
import { RecordContributionModal } from "./Components/modals/RecordContributionModal";
import { INITIAL_GROUPS } from "./data/constants";
import { getRandomGroupIcon } from "./utils/helpers";
import "./index.css";



export default function AjoPad() {
  const [view, setView] = useState("landing");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [groups, setGroups] = useState(INITIAL_GROUPS.map(group => ({
    ...group,
    messages: group.messages ?? [],
    reminders: group.reminders ?? []
  })));
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedChatGroupId, setSelectedChatGroupId] = useState(null);
  const [memberSession, setMemberSession] = useState(null);
  const [memberLoginGroupId, setMemberLoginGroupId] = useState(INITIAL_GROUPS[0]?.id || null);
  const [memberLoginMemberId, setMemberLoginMemberId] = useState(INITIAL_GROUPS[0]?.members?.[0]?.id || null);
  const [memberLoginCode, setMemberLoginCode] = useState("");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState({ msg: "", type: "", show: false });
  const [activeTab, setActiveTab] = useState("members");
  const [newGroup, setNewGroup] = useState({ name: "", desc: "", amount: "", freq: "Monthly", dur: "12" });
  const [newMember, setNewMember] = useState({ name: "", phone: "", role: "Member" });
  const [contribution, setContribution] = useState({ mid: "", amount: "", note: "" });
  const [chatMessage, setChatMessage] = useState("");
  const [reminderNote, setReminderNote] = useState("");
  const [adminProfile, setAdminProfile] = useState({ fullName: "Chidi Obi", phone: "080-1234-5678", email: "chidi@email.com" });
  const appMenu = [
    { id: "landing", label: "Home" },
    { id: "dashboard", label: "Dashboard" },
    { id: "groups", label: "Groups" },
    { id: "groupchat", label: "Group Chat" },
    { id: "payments", label: "Pay" },
    { id: "contributions", label: "Contributions" },
    { id: "payouts", label: "Payouts" },
    { id: "members", label: "Members" },
    { id: "settings", label: "Settings" }
  ];

  const showToast = (msg, type = "success") => {
    setToast({ msg, type, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  };

  const getGroupById = (groupId) => groups.find(g => g.id === groupId);
  const getMemberById = (groupId, memberId) => getGroupById(groupId)?.members?.find(m => m.id === memberId);
  const generateMemberCode = () => Math.floor(1000 + Math.random() * 9000).toString();

  const updateAdminProfile = (profile) => {
    setAdminProfile(profile);
    showToast(`Profile updated: ${profile.fullName}`);
  };

  const createGroup = () => {
    if (!newGroup.name || !newGroup.amount) {
      showToast("Fill required fields", "error");
      return;
    }
    const group = {
      id: Date.now(),
      name: newGroup.name,
      icon: getRandomGroupIcon(),
      description: newGroup.desc || "A new savings circle",
      amount: parseInt(newGroup.amount),
      frequency: newGroup.freq,
      status: "pending",
      collected: 0,
      target: parseInt(newGroup.amount) * parseInt(newGroup.dur),
      startDate: "Jun 2026",
      duration: newGroup.dur + " months",
      nextPayout: "TBD",
      members: [{ id: 1, name: "You (Admin)", role: "Admin", phone: "—", paid: 0, total: parseInt(newGroup.dur), status: "pending" }],
      activity: [{ type: "go", text: "<strong>You</strong> created this group", time: "Just now" }],
      messages: [],
      reminders: []
    };
    setGroups(prev => [group, ...prev]);
    setModal(null);
    setNewGroup({ name: "", desc: "", amount: "", freq: "Monthly", dur: "12", icon: "home" });
    showToast("Group created successfully!");
  };

  const addMember = () => {
    if (!newMember.name || !newMember.phone) {
      showToast("Fill all fields", "error");
      return;
    }
    setGroups(prev => prev.map(group => {
      if (group.id !== selectedGroup.id) return group;
      const updated = {
        ...group,
        members: [...group.members, { 
          id: Date.now(), 
          name: newMember.name, 
          phone: newMember.phone, 
          role: newMember.role, 
          paid: 0, 
          total: group.members[0]?.total || 12, 
          status: "pending",
          loginCode: generateMemberCode()
        }],
        activity: [{ type: "go", text: `<strong>${newMember.name}</strong> was added to the group`, time: "Just now" }, ...group.activity]
      };
      setSelectedGroup(updated);
      return updated;
    }));
    setNewMember({ name: "", phone: "", role: "Member" });
    setModal(null);
    showToast(`${newMember.name} added!`);
  };

  const recordContribution = () => {
    if (!contribution.mid || !contribution.amount) {
      showToast("Fill all fields", "error");
      return;
    }
    const member = selectedGroup.members.find(m => m.id == contribution.mid);
    setGroups(prev => prev.map(group => {
      if (group.id !== selectedGroup.id) return group;
      const updated = {
        ...group,
        collected: group.collected + parseInt(contribution.amount),
        members: group.members.map(m => m.id == contribution.mid ? { ...m, paid: m.paid + 1, status: "paid" } : m),
        activity: [{ type: "g", text: `<strong>${member?.name}</strong> contributed ₦${parseInt(contribution.amount).toLocaleString()}`, time: "Just now" }, ...group.activity]
      };
      setSelectedGroup(updated);
      return updated;
    }));
    setContribution({ mid: "", amount: "", note: "" });
    setModal(null);
    showToast("Contribution recorded!");
  };

  const removeMember = (memberId) => {
    const member = selectedGroup.members.find(m => m.id === memberId);
    if (member?.role === "Admin") {
      showToast("Cannot remove admin", "error");
      return;
    }
    setGroups(prev => prev.map(group => {
      if (group.id !== selectedGroup.id) return group;
      const updated = {
        ...group,
        members: group.members.filter(m => m.id !== memberId),
        activity: [{ type: "r", text: `<strong>${member?.name}</strong> was removed`, time: "Just now" }, ...group.activity]
      };
      setSelectedGroup(updated);
      return updated;
    }));
    showToast(`${member?.name} removed`);
  };

  const signInMember = (groupId, memberId, code) => {
    const member = getMemberById(groupId, memberId);
    if (!member) {
      return showToast("Choose a valid member to sign in", "error");
    }
    if (!code?.trim()) {
      return showToast("Enter the member access code", "error");
    }
    if (member.loginCode !== code.trim()) {
      return showToast("Member code is incorrect", "error");
    }
    setMemberSession({ groupId, memberId });
    setCurrentPage("groupchat");
    setSelectedChatGroupId(groupId);
    setMemberLoginCode("");
    showToast(`Signed in as ${member.name}`);
  };

  const signOutMember = () => {
    setMemberSession(null);
    setCurrentPage("dashboard");
    setSelectedChatGroupId(groups[0]?.id ?? null);
    showToast("Signed out of group chat");
  };

  const sendGroupChat = (groupId, message, senderName = null) => {
    if (!message?.trim()) {
      return showToast("Type a message before sending", "error");
    }
    const defaultSender = memberSession?.groupId === groupId ? getMemberById(groupId, memberSession.memberId)?.name : "You";
    const finalSender = senderName || defaultSender;
    setGroups(prev => prev.map(group => {
      if (group.id !== groupId) return group;
      const updated = {
        ...group,
        messages: [...(group.messages || []), { id: Date.now(), sender: finalSender, text: message.trim(), time: "Just now" }],
        activity: [{ type: "m", text: `<strong>${finalSender}</strong>: ${message.trim()}`, time: "Just now" }, ...group.activity]
      };
      if (selectedGroup?.id === group.id) {
        setSelectedGroup(updated);
      }
      return updated;
    }));
    setChatMessage("");
    showToast("Message sent to group chat");

    if (memberSession?.groupId === groupId) {
      const group = getGroupById(groupId);
      const otherMembers = group?.members?.filter(member => member.id !== memberSession.memberId) || [];
      if (otherMembers.length > 0) {
        const replyMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
        const replies = [
          "Sounds good — I'm on it.",
          "Nice one, let's keep this rolling.",
          "I’ll update the group in a moment.",
          "Thanks for sharing. I agree with that.",
          "Perfect, that works for me."
        ];
        setTimeout(() => {
          setGroups(prev => prev.map(groupItem => {
            if (groupItem.id !== groupId) return groupItem;
            const updated = {
              ...groupItem,
              messages: [...(groupItem.messages || []), { id: Date.now() + 1, sender: replyMember.name, text: replies[Math.floor(Math.random() * replies.length)], time: "Just now" }],
              activity: [{ type: "m", text: `<strong>${replyMember.name}</strong> replied`, time: "Just now" }, ...groupItem.activity]
            };
            if (selectedGroup?.id === groupItem.id) {
              setSelectedGroup(updated);
            }
            return updated;
          }));
        }, 1400);
      }
    }
  };

  const sendReminder = (groupId, note) => {
    if (!note?.trim()) {
      return showToast("Add a reminder note", "error");
    }
    setGroups(prev => prev.map(group => {
      if (group.id !== groupId) return group;
      const updated = {
        ...group,
        reminders: [...(group.reminders || []), { id: Date.now(), text: note.trim(), time: "Just now" }],
        activity: [{ type: "r", text: `<strong>Reminder sent</strong>: ${note.trim()}`, time: "Just now" }, ...group.activity]
      };
      if (selectedGroup?.id === group.id) {
        setSelectedGroup(updated);
      }
      return updated;
    }));
    setReminderNote("");
    showToast("Reminder sent to group members");
  };

  const makePayment = (groupId, amount, note) => {
    if (!groupId || !amount) {
      return showToast("Select group and amount", "error");
    }
    setGroups(prev => prev.map(group => {
      if (group.id !== groupId) return group;
      const updated = {
        ...group,
        collected: group.collected + parseInt(amount),
        activity: [{ type: "g", text: `<strong>PayPal</strong> payment of ₦${parseInt(amount).toLocaleString()} received`, time: "Just now" }, ...group.activity]
      };
      if (selectedGroup?.id === group.id) {
        setSelectedGroup(updated);
      }
      return updated;
    }));
    showToast(`Payment of ₦${parseInt(amount).toLocaleString()} completed`);
  };

  const totalSaved = groups.reduce((sum, g) => sum + g.collected, 0);
  const totalMembers = groups.reduce((sum, g) => sum + g.members.length, 0);
  const activeGroups = groups.filter(g => g.status === "active").length;

  // LANDING PAGE
  if (view === "landing") {
    return (
      <div className="app">
        <Navbar onOpenApp={() => { setView("app"); setCurrentPage("dashboard"); }} />
        <LandingPage onOpenApp={() => { setView("app"); setCurrentPage("dashboard"); }} />
        <Footer />
        <Toast message={toast.msg} type={toast.type} show={toast.show} />
      </div>
    );
  }

  // APP VIEW
  return (
    <div className="app">
      <div className="shell">
        <Sidebar
          activePage={currentPage}
          onPageChange={(page) => {
            if (memberSession && page !== "groupchat") {
              return;
            }
            if (page === "landing") {
              setView("landing");
              setCurrentPage("dashboard");
              setSelectedGroup(null);
              return;
            }
            if (view === "landing") setView("app");
            if (page === "groupchat") {
              setSelectedChatGroupId(groups[0]?.id ?? null);
            }
            setCurrentPage(page);
            setSelectedGroup(null);
            if (page !== "groupchat") setSelectedChatGroupId(null);
          }}
          onLogoClick={() => { setView("landing"); setCurrentPage("dashboard"); }}
          groupsCount={groups.length}
          adminProfile={adminProfile}
          memberSession={memberSession}
          onMemberLogout={signOutMember}
        />
        <main className="main">
          <div className="mobile-app-nav">
            {(memberSession ? [{ id: "groupchat", label: "Group Chat" }] : appMenu).map(item => (
              <button
                key={item.id}
                className={`mobile-nav-btn ${currentPage === item.id ? "act" : ""}`}
                onClick={() => {
                  if (memberSession && item.id !== "groupchat") return;
                  if (item.id === "landing") {
                    setView("landing");
                    setCurrentPage("dashboard");
                    setSelectedGroup(null);
                    return;
                  }
                  if (view === "landing") setView("app");
                  setCurrentPage(item.id);
                  setSelectedGroup(null);
                  if (item.id !== "groupchat") setSelectedChatGroupId(null);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mi">
            {currentPage === "dashboard" && !selectedGroup && (
              <DashboardPage
                groups={groups}
                totalSaved={totalSaved}
                activeGroups={activeGroups}
                totalMembers={totalMembers}
                onGroupSelect={(group) => { setSelectedGroup(group); setCurrentPage("groups"); }}
                onCreateGroup={() => setModal("cg")}
              />
            )}

            {currentPage === "groupchat" && (
              <GroupChatPage
                groups={groups}
                selectedChatGroupId={selectedChatGroupId}
                onSelectChatGroup={setSelectedChatGroupId}
                onSendGroupChat={sendGroupChat}
                memberSession={memberSession}
                memberLoginGroupId={memberLoginGroupId}
                memberLoginMemberId={memberLoginMemberId}
                memberLoginCode={memberLoginCode}
                setMemberLoginGroupId={(value) => {
                  setMemberLoginGroupId(value);
                  setMemberLoginCode("");
                }}
                setMemberLoginMemberId={(value) => {
                  setMemberLoginMemberId(value);
                  setMemberLoginCode("");
                }}
                setMemberLoginCode={setMemberLoginCode}
                onMemberLogin={signInMember}
                onMemberLogout={signOutMember}
              />
            )}

            {currentPage === "payments" && (
              <PaymentsPage
                groups={groups}
                onMakePayment={makePayment}
              />
            )}

            {currentPage === "groups" && !selectedGroup && (
              <GroupsPage
                groups={groups}
                onGroupSelect={setSelectedGroup}
                onCreateGroup={() => setModal("cg")}
              />
            )}

            {selectedGroup && (
              <GroupsPage
                selectedGroup={selectedGroup}
                onBack={() => setSelectedGroup(null)}
                onAddMember={() => setModal("am")}
                onRecordContribution={() => setModal("rc")}
                onRemoveMember={removeMember}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                chatMessage={chatMessage}
                setChatMessage={setChatMessage}
                reminderNote={reminderNote}
                setReminderNote={setReminderNote}
                onSendGroupChat={sendGroupChat}
                onSendReminder={sendReminder}
              />
            )}

            {currentPage === "contributions" && (
              <ContributionsPage groups={groups} />
            )}

            {currentPage === "payouts" && (
              <PayoutsPage groups={groups} />
            )}

            {currentPage === "members" && (
              <MembersPage groups={groups} />
            )}

            {currentPage === "settings" && (
              <SettingsPage
                groupsCount={groups.length}
                activeGroups={activeGroups}
                totalMembers={totalMembers}
                totalSaved={totalSaved}
                adminProfile={adminProfile}
                onUpdateProfile={updateAdminProfile}
              />
            )}
          </div>
        </main>
      </div>

      {/* MODALS */}
      {modal === "cg" && (
        <CreateGroupModal
          onClose={() => setModal(null)}
          onCreate={createGroup}
          formData={newGroup}
          setFormData={setNewGroup}
        />
      )}
      {modal === "am" && selectedGroup && (
        <AddMemberModal
          onClose={() => setModal(null)}
          onAdd={addMember}
          group={selectedGroup}
          formData={newMember}
          setFormData={setNewMember}
        />
      )}
      {modal === "rc" && selectedGroup && (
        <RecordContributionModal
          onClose={() => setModal(null)}
          onRecord={recordContribution}
          group={selectedGroup}
          formData={contribution}
          setFormData={setContribution}
        />
      )}

      <Toast message={toast.msg} type={toast.type} show={toast.show} />
    </div>
  );
}