import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useChat } from "../hook/useChat";
import { setActiveChat, setMessages } from "../chat.slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    chat,
    messages,
    activeChat,
    loading,
    error,
    fetchChats,
    handleSelectChat,
    handleSendMessage,
  } = useChat();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  const handleSend = async () => {
    if (!input.trim()) return;

    await handleSendMessage({
      message: input,
      chatId: activeChat?._id,
    });

    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!loading) {
        handleSend();
      }
    }
  };

  const clearThread = () => {
    dispatch(setActiveChat(null));
    dispatch(setMessages([]));
    setInput("");
  };

  const formatTime = (dateValue) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="grid min-h-screen grid-cols-1 bg-slate-950 text-slate-100 lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-slate-800/80 bg-slate-950/90 p-4 backdrop-blur lg:border-b-0 lg:border-r">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
            Perplexity Mode
          </p>
          <h2 className="mt-2 font-heading text-xl font-bold text-white">
            Ask + Explore
          </h2>
        </div>

        <button
          type="button"
          onClick={clearThread}
          className="mt-3 w-full rounded-xl border border-cyan-700/60 bg-linear-to-r from-cyan-700/70 to-blue-700/70 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:brightness-110"
        >
          + New Thread
        </button>

        <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Recent Chats
          </p>

          <div className="max-h-[44vh] space-y-2 overflow-y-auto pr-1 lg:max-h-[68vh]">
            {loading && <p className="text-xs text-slate-400">Loading...</p>}
            {!loading && chat.length === 0 && (
              <p className="text-xs text-slate-400">No chats yet.</p>
            )}

            {chat.map((c) => (
              <button
                key={c._id}
                type="button"
                onClick={() => handleSelectChat(c)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                  activeChat?._id === c._id
                    ? "border-cyan-500/70 bg-cyan-900/30 text-cyan-100"
                    : "border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700"
                }`}
              >
                {c.title || "New Chat"}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="flex h-[calc(100vh-1px)] min-w-0 flex-col">
        <header className="border-b border-slate-800/80 px-4 py-3 text-sm text-slate-300 lg:px-8">
          {activeChat?.title || "Ask anything"}
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-3 py-5 sm:px-4 lg:px-6 xl:px-8">
          {messages.length === 0 && (
            <div className="mx-auto mt-16 max-w-xl text-center">
              <h1 className="font-heading text-3xl font-extrabold text-white lg:text-5xl">
                Where knowledge begins.
              </h1>
              <p className="mt-3 text-sm text-slate-400 lg:text-base">
                Perplexity-style chat ready. Ask your question below.
              </p>
            </div>
          )}

          {messages.map((msg, index) => {
            const isUser = msg.role === "user";

            return (
              <article
                key={msg._id || index}
                className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`w-fit max-w-[92%] rounded-2xl border px-4 py-3 md:max-w-[78%] ${
                    isUser
                      ? "border-blue-600/60 bg-blue-900/40 text-blue-50"
                      : "border-slate-700 bg-slate-900/80 text-slate-100"
                  }`}
                >
                  <p className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    <span>{isUser ? "You" : "AI"}</span>
                    <span>{formatTime(msg.createdAt)}</span>
                  </p>
                  <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 lg:text-[15px]">
                    {msg.content}
                  </p>
                </div>
              </article>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {error && (
          <p className="mx-3 mb-2 rounded-xl border border-rose-600/50 bg-rose-950/40 px-3 py-2 text-sm text-rose-200 sm:mx-4 lg:mx-6 xl:mx-8">
            {error}
          </p>
        )}

        <div className="border-t border-slate-800/80 px-3 py-3 sm:px-4 lg:px-6 lg:py-4 xl:px-8">
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-700 bg-slate-900/90 p-2 sm:grid-cols-[1fr_auto]">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask follow-up, compare tools, debug code..."
              rows={1}
              className="max-h-40 min-h-10 w-full resize-y border-none bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="rounded-xl border border-cyan-600/70 bg-linear-to-r from-cyan-700 to-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
