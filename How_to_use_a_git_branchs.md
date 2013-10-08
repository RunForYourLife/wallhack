# How to use a git branchs 

Basado en [aprendegit][branch]

## Indice

* [Uso basico](#uso-basico)
* [Trabajando con repositorios remotos](#trabajando-con-repositorios-remotos)
* [¡Conviertete en Mono! (Uso de ramas)](#conviertete-en-mono-uso-de-ramas)
* [Merge de ramas](#merge-de-ramas)
* [La cagamos - como arreglarlo?](#la-cagamos-como-arreglarlo)
* [Log para humanos](#log-para-humanos)


## Uso basico 

Inicializamos 

	$ git init  	//crea el directorio actual un repositorio de git
	
	$ git status
	# On branch master
	#
	# Initial commit
	#
	nothing to commit (create/copy files and use "git add" to track)

Conforme tengamos ficheros los añadimos a staging

	$ git add file1 file2 //Añade a staging el file1 y file2

	$ git status
	# On branch master
	#
	# Initial commit
	#
	# Changes to be committed:
	#   (use "git rm --cached <file>..." to unstage)
	#
	#	new file:   file1
	#	new file:   file2
	#

Podemos añadir todos los cambios sin trackear con un

	$ git add . //Añade a staging todos los cambios pendientes

	$ git status
	# On branch master
	#
	# Initial commit
	#
	# Changes to be committed:
	#   (use "git rm --cached <file>..." to unstage)
	#
	#	new file:   file1
	#	new file:   file2
	#



Momento de hacer commit en nuestro repo local

	$ git commit -m "Mensaje del commit"
	[master (root-commit) e2f7331] Mensaje del commit
	 2 files changed, 2 insertions(+)
	 create mode 100644 file1
	 create mode 100644 file2

## Trabajando con repositorios remotos

Añadir un repo remoto

	$ git remote add origin git@bitbucket.org:robfeb/testlungo.git

Ver los alias a los servidores remotos

	$ git remote
	origin

Ver la url por cada alias

	$ git remote -v
	origin	git@bitbucket.org:robfeb/testlungo.git (fetch)
	origin	git@bitbucket.org:robfeb/testlungo.git (push)

Eliminar el alias remoto

	$ git remote rm origin


Bajarse la versión actual 
	
	$ git pull 


Subir tu versión
	
	$ git push origin master # donde master es la rama que quieres subir puede ser feature-001


## ¡Conviertete en Mono! (Uso de ramas)

Crear una rama

	$ git checkout -b feature-001
	Switched to a new branch 'feature-001'

Para moverte entre ramas

	$ git chekout feature-001

	$ git branch -av
	* feature-001 e2f7331 Mensaje del commit
	  master      e2f7331 Mensaje del commit

	$ git st
	# On branch feature-001
	nothing to commit (working directory clean)


Mostrar las ramas actuales, un asterisco te marca en que rama estas

	$ git branch -av
	* feature-001 e2f7331 Mensaje del commit 
	  master      e2f7331 Mensaje del commit

## Merge de ramas

Primero nos movemos a la rama de destino 

	$ git checkout master

Desde la rama de destino realizamos el merge 

	$ git merge --no-ff feature-001

cuando tenemos el merge de nuestra feature en la rama master, podemos borrar la rama feature-001

	$ git branch -d feature-001
	Deleted branch feature-H-1 (was 765ce08).

## La cagamos - como arreglarlo?

Nos queremos mover a un commit anterior 

    $ git checkout -f idCommit

El comando a ejecutar en git para borrar un commit del que todavía no se ha hecho push es:

	$ git reset --hard HEAD~1

Si ya se ha hecho un push del commit que se quería borrar, lo mejor es hacer un nuevo commit que lo borre mediante un ‘revert’. De este modo aseguramos que si alguien ya se ha bajado el commit que queríamos borrar, pueda arreglar el problema simplemente haciendo un pull. Por tanto, el comando a ejecutar para borrar un commit al que ya se ha hecho un push es:

	$ git revert HEAD

## Log para humanos

Si queremos de un vistazo rapido ver los ultimos commits con:

    $ git log

Veremos el detalle de los ultimos commits con bastante información, llegando a nivel de cambio por fichero, podemos reducirlo a:

    $ git log --oneline

Con esta orden somos capaces de ver los ultimos commits, pero me falta algo de chicha a ver que os parece esta:

    $ git log --pretty=format:"%h%x09%an%x09%ad%x09%s"

Con esta estamos satisfechos ya que nos da el commit el usuario y la fecha, muy util incluso para sacar un timesheet y pasarlo a nuestros clientes.




[branch]: http://aprendegit.com/git-flow-la-rama-develop-y-uso-de-feature-branches/

