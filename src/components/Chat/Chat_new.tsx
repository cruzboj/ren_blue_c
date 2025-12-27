import ChatMessages from "./ChatMessages";


export default function Chat() {
    return (
    <>
        <div className="box relative min-h-[100px] min-w-[100px] w-[400px] h-[400px] bg-zinc-800/0 rounded-lg p-1 flex flex-col">
            <div className="top bg-zinc-900 rounded-t-lg flex-[0.1] flex items-center justify-center text-xs"></div>
            <ChatMessages messages={[]} />
        </div>
    </>
    );
}