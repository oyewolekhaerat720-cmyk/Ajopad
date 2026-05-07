import { useMemo, useState, useRef, useEffect } from "react";
import { PageHeader } from "../sections/shared/PageHeader";
import { getGroupIcon } from "../utils/helpers";
import { MdSend } from "react-icons/md";

export const GroupChatPage = ({
  groups,
  selectedChatGroupId,
  onSelectChatGroup,
  onSendGroupChat,
  memberSession,
  memberLoginGroupId,
  memberLoginMemberId,
  memberLoginCode,
  setMemberLoginGroupId,
  setMemberLoginMemberId,
  setMemberLoginCode,
  onMemberLogin,
  onMemberLogout
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const composerRef = useRef(null);

  const activeGroup = useMemo(() => {
    return groups.find(g => g.id === selectedChatGroupId) || groups[0] || null;
  }, [groups, selectedChatGroupId]);

  const currentLoginGroup = groups.find(g => g.id === memberLoginGroupId) || groups[0] || null;
  const currentLoginMember = currentLoginGroup?.members?.find(m => m.id === memberLoginMemberId) || currentLoginGroup?.members?.[0] || null;
  const currentMember = memberSession ? groups.find(g => g.id === memberSession.groupId)?.members?.find(m => m.id === memberSession.memberId) : null;
  const isMemberLoggedIn = Boolean(memberSession && currentMember);

  useEffect(() => {
    if (activeGroup?.messages?.length >= 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeGroup?.messages?.length]);

  useEffect(() => {
    if (composerRef.current) {
      composerRef.current.style.height = "auto";
      composerRef.current.style.height = `${composerRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    if (currentLoginGroup && !currentLoginGroup.members.some(m => m.id === memberLoginMemberId)) {
      setMemberLoginMemberId(currentLoginGroup.members?.[0]?.id || null);
    }
  }, [currentLoginGroup, memberLoginMemberId, setMemberLoginMemberId]);

  const handleSend = () => {
    if (!activeGroup || !message.trim()) return;
    onSendGroupChat(activeGroup.id, message.trim(), currentMember?.name);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (time) => {
    if (!time || time === "Just now") return time;
    return time;
  };

  return (
    <>
      <PageHeader 
        title="Group <em>Chat</em>" 
        subtitle="A premium chat room for your savings circle conversations." 
      />

      <div className="gg grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5 lg:gap-5 h-[calc(100vh-200px)]">
        
        {/* Sidebar */}
        <aside className="flex flex-col gap-5">
          {/* Groups List */}
          <div className="card bg-card border border-border rounded-xl p-5 flex-1 flex flex-col">
            <div className="ctit font-fd text-[17px] font-semibold text-ink mb-4">Your Groups</div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {groups.map(group => {
                const selected = selectedChatGroupId === group.id;
                return (
                  <button
                    key={group.id}
                    onClick={() => onSelectChatGroup(group.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 grid grid-cols-[auto_1fr] gap-3 items-center ${
                      selected 
                        ? "border-gold bg-gold-dim" 
                        : "border-border/50 bg-card hover:bg-card2"
                    }`}
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                      {getGroupIcon(group.icon, { size: 22 })}
                    </div>
                    <div>
                      <div className="text-ink text-[14px] font-medium">{group.name}</div>
                      <div className="text-ink3 text-xs mt-0.5">{group.members.length} members</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Summary */}
          <div className="card bg-card border border-border rounded-xl p-5">
            <div className="ctit font-fd text-[17px] font-semibold text-ink mb-4">Chat summary</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-ink2">Groups</span><strong className="text-ink">{groups.length}</strong></div>
              <div className="flex justify-between"><span className="text-ink2">Messages</span><strong className="text-ink">
                {groups.reduce((sum, g) => sum + (g.messages?.length || 0), 0)}
              </strong></div>
              <div className="flex justify-between"><span className="text-ink2">Active group</span><strong className="text-ink">{activeGroup?.name ?? "None"}</strong></div>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <section className="flex flex-col gap-5 relative">
          {!activeGroup ? (
            <div className="card bg-card border border-border rounded-xl p-8 h-full flex items-center justify-center text-center">
              <div>
                <div className="pt font-fd text-2xl text-ink mb-3">Select a group to start chatting</div>
                <div className="ps text-ink2">Choose any group from the left panel to sign in and access group chat.</div>
              </div>
            </div>
          ) : (
            <>
              {/* Group Header */}
              <div className="card bg-card border border-border rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                    {getGroupIcon(activeGroup.icon, { size: 26 })}
                  </div>
                  <div>
                    <div className="pt font-fd text-[18px] text-ink">{activeGroup.name}</div>
                    <div className="ps text-ink2 text-sm">{activeGroup.description}</div>
                  </div>
                </div>
                
                {isMemberLoggedIn && (
                  <button onClick={onMemberLogout} className="bs bsm">
                    Sign out
                  </button>
                )}
              </div>

              {/* Member Login Form */}
              {!isMemberLoggedIn ? (
                <div className="card bg-card border border-border rounded-xl p-6">
                  <div className="ctit font-fd text-[17px] font-semibold text-ink">Member login</div>
                  <div className="ps text-ink2 mt-2">Pick a group member and sign in to use chat-only access.</div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="fl">Select group</label>
                      <select
                        value={memberLoginGroupId}
                        onChange={(e) => setMemberLoginGroupId(Number(e.target.value))}
                        className="fi w-full"
                      >
                        {groups.map(group => (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="fl">Select member</label>
                      <select
                        value={currentLoginMember?.id || ""}
                        onChange={(e) => setMemberLoginMemberId(Number(e.target.value))}
                        className="fi w-full"
                      >
                        {currentLoginGroup?.members?.map(member => (
                          <option key={member.id} value={member.id}>{member.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="fl">Member access code</label>
                      <input
                        type="password"
                        value={memberLoginCode}
                        onChange={(e) => setMemberLoginCode(e.target.value)}
                        placeholder="Enter 4-digit code"
                        className="fi w-full"
                      />
                    </div>

                    <button
                      className="bp w-full py-4 text-base"
                      onClick={() => onMemberLogin(currentLoginGroup.id, currentLoginMember?.id, memberLoginCode)}
                      disabled={!currentLoginMember || !memberLoginCode.trim()}
                    >
                      Sign in as {currentLoginMember?.name || "member"}
                    </button>

                    <div className="text-xs text-ink3 leading-relaxed">
                      This mode gives signed-in members chat access only. The rest of the app is locked while logged in.
                    </div>
                  </div>
                </div>
              ) : (
                /* Chat Interface */
                <div className="card bg-card border border-border rounded-xl flex-1 flex flex-col min-h-0 relative overflow-hidden">
                  <div className="p-5 border-b border-border flex items-center justify-between">
                    <div>
                      <div className="ctit">Chat history</div>
                      <div className="ps mt-1">Signed in as <strong className="text-ink">{currentMember.name}</strong></div>
                    </div>
                    <span className="gst active">Member access</span>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {(activeGroup.messages?.length > 0 ? activeGroup.messages : [{
                      id: "empty",
                      sender: "System",
                      text: "No conversation yet — send the first message.",
                      time: ""
                    }]).map(msg => {
                      const isOwn = msg.sender === currentMember.name;
                      return (
                        <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[75%] px-6 py-5 rounded-3xl ${
                            isOwn 
                              ? "bg-gradient-to-br from-gold/25 to-gold/10 border border-gold/30 shadow-xl" 
                              : "bg-white/5 border border-white/10"
                          }`}>
                            <div className="flex justify-between items-center mb-3">
                              <strong className={`text-xs ${isOwn ? "text-gold" : "text-ink2"}`}>
                                {msg.sender}
                              </strong>
                              {msg.time && <span className="text-[11px] text-ink3">{formatTime(msg.time)}</span>}
                            </div>
                            <div className="text-[14px] leading-relaxed text-ink">
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Composer */}
                  <div className="absolute bottom-6 left-6 right-6 bg-bg2 border border-border rounded-3xl p-4 shadow-2xl">
                    <div className="flex gap-3 items-end">
                      <textarea
                        ref={composerRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        rows={1}
                        className="fi flex-1 min-h-[56px] max-h-[140px] resize-y py-4 px-5 text-[15px]"
                      />
                      <button
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          message.trim() 
                            ? "bg-gradient-to-br from-gold to-gold2 text-bg shadow-gold" 
                            : "bg-gold/20 text-gold/40 cursor-not-allowed"
                        }`}
                      >
                        <MdSend size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};