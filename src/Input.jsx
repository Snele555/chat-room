

export default function Input ({message, onMessageChange, onMessageSave}) {
console.log ("Input rendered")
    return (
        <div className = "Input">
            <form>
            <input type= "text" placeholder="you wanted to say...." 
            value={message}
            onChange={onMessageChange}/>

            <button onClick ={onMessageSave}>Say it!</button>
            </form>
        </div>
        
        )
}