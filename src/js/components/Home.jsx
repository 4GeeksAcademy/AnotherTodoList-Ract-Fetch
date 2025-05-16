import React, {useState, useEffect} from "react";
import ToDoList from "./ToDoList";

const Home = () => {
	const [userIn, setUserIn] = useState("");

	const postToDo = async (user) => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/" + user, {
				method: "POST",
			});
			if (!response.ok)
				throw new Error(response.statusText);
			else {
			let dataJson = await response.json();
			console.log(dataJson);
			if(dataJson.datail === "User already exists." || dataJson.name === user )
			setUserIn(user);
			}
		} catch (error) {
			console.log('Looks like there was a problem: \n', error);
		}
	}

	return (
		<>
		<div className="box">
			{ userIn.length > 0 ?
				( 	<>
						<span>Usuario:&nbsp;<strong>{userIn.length > 0 && userIn}</strong>  </span>
						<button onClick={ () => setUserIn("")}>Salir</button>
				</>	) :
				<input id = "userIn" type = "text" className=""
				placeholder = "Introduce un usuario"
				onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim() !== '') {
							postToDo(e.target.value.trim());
                            e.target.value = '';
            }}}
				/>
			}
		</div>
		{userIn.length > 0 && <ToDoList shareUser = {userIn}/> }
		</>
	);
};

export default Home;