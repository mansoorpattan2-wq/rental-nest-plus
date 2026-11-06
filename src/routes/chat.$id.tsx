import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame, TopBar } from "@/components/AppShell";
import { chatMessages, conversations } from "@/lib/mock-data";
import { Paperclip, Camera, Send, Calendar } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/chat/$id")({
  component: ChatRoom,
});

function ChatRoom() {
  const { id } = Route.useParams();
  const c = conversations.find((x) => x.id === id) ?? conversations[0];
  const [msgs, setMsgs] = useState(chatMessages);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMsgs([...msgs, { from: "me", text, time: "now" }]);
    setText("");
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full flex-1">
        <TopBar
          back="/chat"
          title={c.name}
          subtitle={c.property}
          right={
            <button className="h-9 w-9 rounded-full border border-border grid place-items-center">
              <Calendar className="h-4 w-4" />
            </button>
          }
        />

        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3 bg-secondary/40">
          <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground">Today</p>
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "me" ? "bg-forest text-cream rounded-br-sm" : "bg-background border border-border rounded-bl-sm"}`}>
                <p>{m.text}</p>
                <p className={`text-[10px] mt-1 ${m.from === "me" ? "text-cream/60" : "text-muted-foreground"}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3 flex items-center gap-2 bg-background">
          <button className="h-10 w-10 grid place-items-center rounded-full hover:bg-secondary"><Paperclip className="h-4 w-4" /></button>
          <button className="h-10 w-10 grid place-items-center rounded-full hover:bg-secondary"><Camera className="h-4 w-4" /></button>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message…"
            className="flex-1 h-11 rounded-full bg-secondary px-4 text-sm outline-none"
          />
          <button onClick={send} className="h-11 w-11 rounded-full bg-forest text-cream grid place-items-center">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
