import "./Login.css"
function Loginpage(){
    return(
        <div className="loginpage">
        <form>
            <label htmlFor="phno">Mobile Number</label><br/>
            <input type="num" name="phno" id="phno" placeholder="89193XXXX" /><br/>
            <label htmlFor="name">Name</label><br/>            
            <input type="text"  id="name" placeholder="Enter your name" /><br/>
            <label htmlFor="pass">Password</label><br/>
            <input type="password" name="pass" id="pass" placeholder="Enter your password"/><br/>
        </form>
        <p>Not having accont! <span>SignUp</span></p>
        </div>
    )
}
export default Loginpage;