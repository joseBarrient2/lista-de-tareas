let task = document.querySelector('#text-tarea');
let btnAdd = document.querySelector('.btn_plus');  
let form = document.querySelector('.form-tareas');
let arrayTask = [];
let contador = 1;
let taskArea = document.querySelector('.work-list');
const listItems = document.querySelectorAll('.task');
let lista = document.getElementById('lista-tareas');
let countTareas = document.querySelector('.nTareas');
let done = document.querySelector('.done');
let taskChecked = 0 ;
let barra = document.querySelector('.bar');

    if(arrayTask.length < 1){
    taskArea.innerHTML = `
    <div class="sinTareas">
      <p class="textoVacio">Sin Tareas</p>
    </div>
    `;
    }

taskArea.addEventListener('click',adminTask);

btnAdd.addEventListener('click', function(e){
  e.preventDefault();
  let tarea = task.value.trim();  
  if(tarea != ''){
    agregarObjeto(tarea);
  }
  else{
      console.log('ingrese una tarea');
    }  
})

function agregarObjeto(tarea){

  let objetTask = {
    id: contador++,
    tarea: tarea,
    complete: false
  }

  arrayTask = [objetTask, ...arrayTask];
  addTarea();
}

function addTarea(){

  taskArea.innerHTML = '';
  countTareas.innerHTML = arrayTask.length;
  arrayTask.map(tarea =>{                                    
                        taskArea.innerHTML +=`
        <article class="task" draggable="true" id=${tarea.id} data-id="${tarea.id}">
        <div class="task-status">
            <div class="task-check-circle">
              <span class="fa iconCheck ${tarea.complete ? 'fa-check':''}" data="status"></span>
            </div>
        </div>
        <div class="task-task boxlist">
          <p class="new-task ${tarea.complete ? 'tacha':''}" data="texto">${tarea.tarea}</p>
        </div>
        <a class="task-delete">
           <i class="fas fa-trash" data="delete" id=${tarea.id}></i>
        </a>
    </article>`;       
    });
    
    task.value = '';
}

function adminTask(e){
  
  let accion = e.target.attributes.data.value;   
  let icon = e.target;//id de la tarea

   if(accion === 'status'){ 
       cambiarStatus(e)
   }
   else if(accion === 'delete'){   
         deleteTasks(icon);         
   }
}

function deleteTasks(item){
  let resultado = arrayTask.filter(newObjet => newObjet.id !== parseInt(item.id));

  arrayTask.forEach(t => {
      if(t.id == item.id){
        if(t.complete == true){
          taskChecked--;
          done.innerHTML = taskChecked;
        }
      }
  });

    arrayTask = resultado;
    addTarea();
    tareasComplete();
        
    if(arrayTask.length < 1){
      taskArea.innerHTML = `
      <div class="sinTareas">
        <p class="textoVacio">Sin Tareas</p>
      </div>
      `;
      
   
  }
}

function cambiarStatus(e){
  let icon = e.target;//id de la tarea
  let pos = Number(icon.parentNode.parentNode.parentNode.id);
  texto = icon.parentNode.parentNode.nextElementSibling.querySelector('.new-task');

   
  for(t=0; t < arrayTask.length; t++){
       if(arrayTask[t].id == pos){
        let u = arrayTask[t].complete === false ? true : false;
          arrayTask[t].complete = u;
           if(u == true){
            texto.classList.add('tacha');
            icon.classList.add('fa-check');
            taskChecked++;
            done.innerHTML = taskChecked;      
          }else{
            
            texto.classList.remove('tacha');
            icon.classList.remove('fa-check');
            if(taskChecked > 0){taskChecked--}
            done.innerHTML = taskChecked;        
          }     
          
       }          
              
  }
  tareasComplete();

}


function deleteTask(item){
  const resultado = arrayTask.filter(newObjet => newObjet.id !== parseInt(item.id));
  arrayTask = resultado;
  taskChecked--;
  done.innerHTML = taskChecked;
  addTarea();
  
  if(arrayTask.length < 1){
    taskArea.innerHTML = `
    <div class="sinTareas">
      <p class="textoVacio">Sin Tareas</p>
    </div>
    `;
    }
}

function tareasComplete(){
  let nivel = 100 / arrayTask.length; 
  let ancho = nivel * taskChecked;

  if(taskChecked >= 0){
   barra.style.width = 0;
   barra.style.width = ancho+='%';
  }
  
  if(taskChecked === arrayTask.length && arrayTask.length > 0){
    congratulation(); 
  }   
}

const congratulation = () =>{
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
          confetti(
            Object.assign({}, defaults, opts, {
              particleCount: Math.floor(count * particleRatio),
            })
          );
        }

        fire(0.25, { spread: 26,startVelocity: 55,});

        fire(0.2, {
          spread: 60,
        });

        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });

}

Sortable.create(lista,{
  handle:'.boxlist',
  animation: 150,
  group: "mis-tareas",
  dragClass:"drag",
  store: {
    set: (sortable)=>{
       const orden = sortable.toArray();
       localStorage.setItem(sortable.options.group.name, orden.join('|'));
    },
    get:(sortable)=>{
        const orden = localStorage.getItem(sortable.options.group.name);
        return orden ? orden.split('|') : []; 
    }
  }
});


