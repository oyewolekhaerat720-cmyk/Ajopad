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
      <PageHeader title="Group <em>Chat</em>" subtitle="A premium chat room for your savings circle conversations." />

      <div className="gg group-chat-grid" style={{ gap: 20, alignItems: "flex-start" }}>
        <aside style={{ width: "100%", minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="card" style={{ padding: 20, flex: 1 }}>
            <div className="ctit">Your Groups</div>
            <div style={{ marginTop: 18, display: "grid", gap: 12, overflowY: "auto" }}>
              {groups.map(group => {
                const selected = selectedChatGroupId === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => onSelectChatGroup(group.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: 14,
                      borderRadius: 18,
                      border: selected ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,.08)",
                      background: selected ? "rgba(255,215,0,.12)" : "rgba(255,255,255,.02)",
                      color: "var(--ink)",
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 12,
                      alignItems: "center",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(255,255,255,.08)", display: "grid", placeItems: "center" }}>
                      {getGroupIcon(group.icon, { size: 22 })}
                    </div>
                    <div>
                      <div className="pt" style={{ fontSize: 14 }}>{group.name}</div>
                      <div className="ps" style={{ fontSize: 12 }}>{group.members.length} members</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div className="ctit">Chat summary</div>
            <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Groups</span><strong>{groups.length}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Messages</span><strong>{groups.reduce((sum, g) => sum + (g.messages?.length || 0), 0)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Active group</span><strong>{activeGroup?.name ?? "None"}</strong></div>
            </div>
          </div>
        </aside>

        <section style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18, position: "relative" }}>
          {!activeGroup ? (
            <div className="card" style={{ padding: 24, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div className="pt" style={{ fontSize: 24, marginBottom: 8 }}>Select a group to start chatting</div>
                <div className="ps">Choose any group from the left panel to sign in and access group chat only.</div>
              </div>
            </div>
          ) : (
            <>
              <div className="card" style={{ padding: 20, display: "flex", gap: 18, alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,.08)", display: "grid", placeItems: "center" }}>
                    {getGroupIcon(activeGroup.icon, { size: 26 })}
                  </div>
                  <div>
                    <div className="pt" style={{ fontSize: 18 }}>{activeGroup.name}</div>
                    <div className="ps">{activeGroup.description}</div>
                  </div>
                </div>
                {isMemberLoggedIn && (
                  <button className="bs bsm" onClick={onMemberLogout}>Sign out</button>
                )}
              </div>

              {!isMemberLoggedIn ? (
                <div className="card" style={{ padding: 24, minHeight: 320, background: "rgba(8, 12, 20, 0.95)", border: "1px solid rgba(255,255,255,.08)" }}>
                  <div className="ctit">Member login</div>
                  <div className="ps" style={{ marginTop: 8 }}>Pick a group member and sign in to use chat-only access.</div>
                  <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                    <div style={{ display: "grid", gap: 8 }}>
                      <label className="fl">Select group</label>
                      <select
                        value={memberLoginGroupId}
                        onChange={(e) => setMemberLoginGroupId(Number(e.target.value))}
                        style={{
                          width: "100%",
                          padding: 14,
                          borderRadius: 18,
                          border: "1px solid rgba(255,255,255,.14)",
                          background: "rgba(20, 26, 36, 0.95)",
                          color: "var(--ink)",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none"
                        }}
                      >
                        {groups.map(group => (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ display: "grid", gap: 8 }}>
                      <label className="fl">Select member</label>
                      <select
                        value={currentLoginMember?.id || ""}
                        onChange={(e) => setMemberLoginMemberId(Number(e.target.value))}
                        style={{
                          width: "100%",
                          padding: 14,
                          borderRadius: 18,
                          border: "1px solid rgba(255,255,255,.14)",
                          background: "rgba(20, 26, 36, 0.95)",
                          color: "var(--ink)",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none"
                        }}
                      >
                        {currentLoginGroup?.members?.map(member => (
                          <option key={member.id} value={member.id}>{member.name}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ display: "grid", gap: 8 }}>
                      <label className="fl">Member access code</label>
                      <input
                        type="password"
                        value={memberLoginCode}
                        onChange={(e) => setMemberLoginCode(e.target.value)}
                        placeholder="Enter 4-digit code"
                        style={{
                          width: "100%",
                          padding: 14,
                          borderRadius: 18,
                          border: "1px solid rgba(255,255,255,.14)",
                          background: "rgba(20, 26, 36, 0.95)",
                          color: "var(--ink)",
                          outline: "none"
                        }}
                      />
                    </div>
                    <button
                      className="bp"
                      onClick={() => onMemberLogin(currentLoginGroup.id, currentLoginMember?.id, memberLoginCode)}
                      style={{
                        background: "linear-gradient(135deg, rgba(255,203,96,1), rgba(216,158,22,1))",
                        color: "#1b1a10",
                        borderRadius: 999,
                        minHeight: 52,
                        boxShadow: "0 16px 32px rgba(255,189,74,.25)",
                        border: "1px solid rgba(255,255,255,.14)"
                      }}
                      disabled={!currentLoginMember || !memberLoginCode.trim()}
                    >
                      Sign in as {currentLoginMember?.name || "member"}
                    </button>
                    <div className="ps" style={{ color: "var(--ink3)" }}>
                      This mode gives signed-in members chat access only. The rest of the app is locked while logged in.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div>
                      <div className="ctit" style={{ margin: 0 }}>Chat history</div>
                      <div className="ps" style={{ marginTop: 4 }}>Signed in as <strong>{currentMember.name}</strong></div>
                    </div>
                    <span className="gst active" style={{ padding: "8px 14px", fontSize: 11 }}>Member access</span>
                  </div>

                  <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, paddingRight: 4, paddingBottom: 120 }}>
                    {(activeGroup.messages?.length > 0 ? activeGroup.messages : [{ id: "empty", sender: "System", text: "No conversation yet — send the first message.", time: "" }])
                      .map(msg => {
                        const isOwn = msg.sender === currentMember.name;
                        return (
                          <div key={msg.id} style={{ display: "flex", justifyContent: isOwn ? "flex-end" : "flex-start" }}>
                            <div style={{
                              maxWidth: "75%",
                              padding: 18,
                              borderRadius: 22,
                              background: isOwn ? "linear-gradient(135deg, rgba(255,215,0,.22), rgba(255,215,0,.12))" : "rgba(255,255,255,.05)",
                              border: isOwn ? "1px solid rgba(255,215,0,.28)" : "1px solid rgba(255,255,255,.08)",
                              color: "var(--ink)",
                              boxShadow: isOwn ? "0 10px 30px rgba(255,215,0,.12)" : "0 2px 12px rgba(0,0,0,.08)"
                            }}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 10, alignItems: "center" }}>
                                <strong style={{ fontSize: 13, color: isOwn ? "var(--gold)" : "var(--ink2)" }}>{msg.sender}</strong>
                                {msg.time && <span style={{ fontSize: 11, color: "var(--ink3)", opacity: 0.85 }}>{formatTime(msg.time)}</span>}
                              </div>
                              <div style={{ fontSize: 14, lineHeight: 1.7 }}>{msg.text}</div>
                            </div>
                          </div>
                        );
                      })}
                    <div ref={messagesEndRef} />
                  </div>

                  <div style={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    right: 24,
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 12,
                    alignItems: "end",
                    background: "rgba(10, 14, 22, 0.98)",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 32,
                    padding: "18px 18px",
                    boxShadow: "0 20px 60px rgba(0,0,0,.35)"
                  }}>
                    <textarea
                      ref={composerRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder=""
                      rows={1}
                      style={{
                        width: "100%",
                        minHeight: 56,
                        maxHeight: 140,
                        borderRadius: 22,
                        border: "1px solid rgba(255,255,255,.14)",
                        background: "rgba(255,255,255,.08)",
                        color: "var(--ink)",
                        fontSize: 15,
                        padding: "16px 18px",
                        outline: "none",
                        resize: "none",
                        overflowY: "hidden",
                        lineHeight: 1.7,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)",
                        fontFamily: "var(--fb)"
                      }}
                    />
                    <button
                      className="bp"
                      onClick={handleSend}
                      disabled={!message.trim()}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: message.trim() ? "linear-gradient(135deg, #ffce5f, #d89a0d)" : "rgba(255,215,0,.2)",
                        color: message.trim() ? "#1b1a10" : "rgba(0,0,0,.4)",
                        border: "none",
                        display: "grid",
                        placeItems: "center",
                        boxShadow: message.trim() ? "0 16px 28px rgba(255,189,74,.25)" : "none",
                        cursor: message.trim() ? "pointer" : "not-allowed"
                      }}
                    >
                      <MdSend size={22} />
                    </button>
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