

export default function Input ({text, onMessageChange, onMessageSave}) {

    
    return (
        <div className = "Input">
            <form>
            <input type= "text" placeholder="You wanted to say...." 
            value={text}
            onChange={onMessageChange}/>

            <button onClick ={onMessageSave}>Say it!</button>
            </form>
        </div>
        
        )
}