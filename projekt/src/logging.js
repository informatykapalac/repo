const username='Janek';
const password='asdfghjkl';
const config={
	host: '85.10.205.173',
    port: 3306,
    user: 'admin_41487',
    password: '1q2w3e4r',
    database: 'game_data'
};
const reg=/^[a-zA-Z0-9]{3,}$/;
const connection=mysql.createConnection(config);
connection.connect(err => {
	if(err){
		alert("test1");
	}
});
if (reg.test(username)){
	if (reg.test(username)){
		app.all('/', (req, res)=>{
			connection.query("SELECT * FROM users WHERE 'username'=name", (err, results, fields)=>{
				const numrows=results.length;
				if (numrows==1){
					connection.query("SELECT * FROM users WHERE 'password'=password", (err, results, fields)=>{
						const numrows=results.length;
						if (numrows==1){
							alert("test2");
						}else{
							alert("test3");
						}
					});
				}else{
					alert("test4");
				}
			});
		});
	}else{
		alert("test5");
	}
}else{
	alert("test6");
}
connection.end();
alert("test7.1");