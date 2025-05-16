import {useState} from "react";
import ToDoList from "./ToDoList";

const Home = () => {
	const [userIn, setUserIn] = useState("");

	const postToDo = async (input) => {
			const response = await fetch("https://playground.4geeks.com/todo/users/" + input, {
				method: "POST",
			});
		let dataJson = await response.json();
			console.log(dataJson);
			if(dataJson.detail === "User already exists." || dataJson.name === input )
			setUserIn(input);
	}	// try...catch no es necesario porque cuando el usuario existe, ocurre un error 400 y la API devuelve
		// un mensaje que lo confirma. Si el usuario no existe, lo crea. Mientras la URL esté bien escrita, la API es funcional.

	return (
		<>
		<div className="box">
			{ userIn.length > 0 ?
				( 	<>
						<span>Usuario:&nbsp;<strong>{userIn}</strong>  </span>
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