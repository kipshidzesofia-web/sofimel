// Menú móvil
const burger=document.querySelector('.burger');
const menu=document.querySelector('nav ul');
if(burger){burger.addEventListener('click',()=>{
  const abierto=menu.classList.toggle('abierto');
  burger.setAttribute('aria-expanded',abierto);
});}

// Efecto fade-in al hacer scroll
const io=new IntersectionObserver((entradas)=>{
  entradas.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
},{threshold:.15});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));

// Validación del formulario de contacto
const form=document.getElementById('form-contacto');
if(form){
  const msg=document.getElementById('mensaje-form');
  const reglas={
    nombre:v=>v.trim().length>=2||'Introduce tu nombre.',
    email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)||'Introduce un correo válido.',
    telefono:v=>v===''||/^[\d\s+()-]{9,15}$/.test(v)||'Teléfono no válido.',
    mensaje:v=>v.trim().length>=10||'Cuéntanos un poco más (mín. 10 caracteres).'
  };
  form.addEventListener('submit',e=>{
    e.preventDefault();
    let ok=true;
    Object.keys(reglas).forEach(n=>{
      const campo=form.elements[n];
      const r=reglas[n](campo.value);
      campo.parentElement.querySelector('.error').textContent=r===true?'':r;
      if(r!==true)ok=false;
    });
    if(!form.elements.privacidad.checked){
      form.querySelector('.err-priv').textContent='Debes aceptar la política de privacidad.';ok=false;
    }else form.querySelector('.err-priv').textContent='';
    if(ok){
      // Aquí se conectaría con el servidor (PHP, Formspree, etc.)
      msg.style.display='block';
      msg.textContent='¡Gracias! Hemos recibido tu mensaje y te responderemos lo antes posible.';
      form.reset();
    }
  });
}

// Cabecera: transparente sobre el hero y sólida al hacer scroll
const cab=document.querySelector('header');
if(cab){
  const marcar=()=>cab.classList.toggle('scrolled',window.scrollY>40);
  marcar();window.addEventListener('scroll',marcar,{passive:true});
}
