<h1> Instalación </h1>

<ul>
    <li>cp .env_example .env</li>
    <li>Configurar en .env las variables de la BD</li>
    <li>sequelize db:migrate</li>
    <li>npm install</li>
    <li>npm start ó npm test (para que corra como demonio y no haya que actualizar cada vez que hay un cambio)</li>
</ul>

<h1> Endpoints </h1>

Las peticiones que tengan el ícono: 🔐 necesitan que en los headers se les mande en los header:


```
{
    "Authorization" : "Bearer {token devuelto en login/register}"
}

```

<br>
<h2> ✅  Usuarios</h2>
<br>


<h3> 😜 Login: POST -> /users/authenticate</h3>

```
Parametros de envio:
{
    "email"     : Sintrg,
    "password"  : String
}

Devolución:

{
    "id"                : Int,
    "nombre"            : String,
    "apellido"          : String,
    "email"             : String,
    "fecha_nacimiento"  : String,
    "telefono"          : String,
    "latitud"           : Double,
    "longitud"          : Double,
    "is_empresa"        : Bool,
    "token"             : Stirng
}

```


<h3>😜 Register: POST -> /users/register</h3>


```
Parametros de envio:
{
    "nombre"            : String,
    "apellido"          : String,
    "email"             : String,
    "password"          : String,
    "fecha_nacimiento"  : String,
    "telefono"          : String,
    "is_empresa"        : Bool
}

Devolución:

{
    "id"                : Int,
    "nombre"            : String,
    "apellido"          : String,
    "email"             : String,
    "fecha_nacimiento"  : String,
    "telefono"          : String,
    "latitud"           : Double,
    "longitud"          : Double,
    "is_empresa"        : Bool,
    "token"             : Stirng
}

```




<h3>🔐  Edit: PUT -> /users/{id_user}</h3>


```
Parametros de envio:
{
    "nombre"            : String,
    "apellido"          : String,
    "email"             : String,
    "password"          : String,
    "fecha_nacimiento"  : String,
    "telefono"          : String,
    Opcionales -> "latitud"           : Double,
    Opcionales -> "longitud"          : Double,
    Opcionales -> "is_empresa"        : Bool
    
}

Devolución:

{
    "id"                : Int,
    "nombre"            : String,
    "apellido"          : String,
    "email"             : String,
    "fecha_nacimiento"  : String,
    "telefono"          : String,
    "latitud"           : Double,
    "longitud"          : Double,
    "is_empresa"        : Bool,
    "token"             : Stirng
}

```





<h3>🔐 Show: GET -> /users/{id_user}</h3>


```

Devolución:

{
    "id"                : Int,
    "nombre"            : String,
    "apellido"          : String,
    "email"             : String,
    "fecha_nacimiento"  : String,
    "telefono"          : String,
    "latitud"           : Double,
    "longitud"          : Double,
    "is_empresa"        : Bool,
    "calificaciones"    : Array,
    "promedio"          : Double
}

```



<h3>🔐 Calificar: POST -> /users/{id_user}</h3>


```
Parametros de envio:
{
    "calificacion" : Double,
    "comentarios"   : String,
}

Devolución:

{
    "error"   : Bool,
    "message" : String,
}

```


<h3>🔐 Agregar amigo: POST -> /users/addFriend</h3>

```
Parametros de envio:
{
    "telefono_friend"   : String,
}

Devolución:

{
    "error"   : Bool,
    "message" : String,
}

```


<h3>🔐 Eliminar amigo: POST -> /users/deleteFriend/{friend_id}</h3>

```
Devolución:

{
    "error"   : Bool,
    "message" : String,
}

```



<h3>🔐 Descaartar publicacion : POST -> /users/descartarPublicacion/{publicacion_id}</h3>

```
Devolución:

{
    "error"   : Bool,
    "message" : String,
}

```






<br>
<h2> ✅  Publicaciones</h2>
<br>


<h3>🔐 Calificar: POST -> /publicaciones/{id_publicacion}</h3>


```
Parametros de envio:
{
    "calificacion" : Double,
    "comentarios"   : String,
}

Devolución:

{
    "error"   : Bool,
    "message" : String,
}

```