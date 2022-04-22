// instancia jquery e evita conflitos
// jQuery( function($){
$(document).ready(function(){

    $('.owl-carousel').owlCarousel();

    let titulos = $('h4') // tag
   
    let itens = $('.featured-item') // class
    
    let destaques = $('#featured') // id

    console.log(titulos.first());

    // Configuração de produtos

    $('.featured-item a').addClass('btn btn-dark stretch-link');

    $('.featured-item:first h4').append('<span class="badge bg-secondary">Novo</span>')

     
     $('.featured-item h4').dblclick( function(){

        $(this).css({
            'color': '#f00',
            'background': '#ff0',
            'font-weight': '100',
        });

     });

     /*
      * Manipulação de eventos
      */
     $('.featured-item a').on('blur', function(event){

        event.preventDefault();

        alert('Produto esgotado');

     })

     $('.featured-item:nth(1)')
        .hide(2000, function(){
        //callback
       // alert($(this).find('h4').text() + 'esgotado')
            console.log($(this).find('h4').text() + 'esgotado')
     })
         .toggle(2000)
         .show(2000, function(){
            console.log( $(this).find('h4').text() + 'em estoque')
         })

         /*
          * Animações
          */
         const duracao = 1000// equivalw 1 segundo

         $('.featured-item:nth(0)')
            .hide(duracao) //esconde 
            .show(duracao) //mostra
            .fadeOut(duracao)//transparente depois esconde
            .fadeIn(duracao) //escondido aos poucos transparente e mostra 
            .toggle(duracao)// faz inverso da anterior, se é show ele faz hide ou vise-versa
            .toggle(duracao)// inverso da anterior
     
         $('.featured-item:nth(2)')  
            .hide(2000)
            .toggle(5000)
     
     /*
      * Validar forumulario regex usando jQuery
      */
     $('#form-submit').on('click', function(e){

      e.preventDefault()

      if( $('#email').val() != '' ){

         $('#email').animate({
            opacity: "toggle",
            top: "-50"
         }, 500, function(){
            console.log($(this).val())
         })

      }

   });

   /*
    * Ouvinte de eventos .nav-modal-open
    */
   $('.nav-modal-open').on('click', function(e){

      e.preventDefault();

      let elem = $(this).attr('rel')

      $('.modal-body').html($('#'+elem).html())
      
      $('.modal-header h5.modal-title').html($(this).text())

      let myModal = new bootstrap.Modal($('#modelId'))

      myModal.show()

   })


   /*
    * - Incrementar a validação
    * - checar se o nome é válido (mais de 2 caracteres)
    * - checar se o email é válido com ao menos um "@" e "."
    * - checar se o cpf é válido com regex
    */

 
   function validate( elem ){
      if( elem.val() == '') {

         console.log('o campo de '+ elem.attr('name') + ' é obrigatório')

         elem.parent().find('.text-muted').show()

         elem.addClass('invalid')

         return false
      } else {
         elem.parent().find('.text-muted').hide()
         elem.removeClass('invalid')
      }
   }

   $('body').on('submit', '.modal-body .form', function(e){

      e.preventDefault()

      $('#form-jquery').validate({
         rules:{
            nome:{
               required: true,
               minlength: 2
            },
            email:{
               required: true,
               email: true
            },
            cpf:{
               minlength: 14,
               maxlength: 14
            },
         },
         messages:{
            nome:{
               required: 'Digite seu nome',
               minlength:'Nome precisa ter pelo menos 2 caracteres'
            },
            email:{
               email: 'Digite um email válido com "@" e "." ' 
            },
            cpf:{
               maxlength: 'Digite um CPF válido'
            },
         },
         submitHandler: function(form){
            alert('Fromulario enviado')
            $('.modal').modal('hide')
         }
      })
/*
      const inputName = $('#nome')
      const inputEmail = $('#email')

      validate(inputName)
      validate(inputEmail)

      if(inputEmail.hasClass('invalid') || inputName.hasClass('invalid')){
         console.log('verificar campos obrigatórios')
         return false
      } else {
         $(this).submit()  
      }
*/
      /* Validar From */

   })   

   $('body').on('blur', '#nome', function(){
      validate($(this))
   })

   $('body').on('blur', '#email', function(){
      validate($(this))
   })


   $('body').on('focus', '#date', function(){
      $(this).datepicker()
   })

   $('body').on('blur', '#date', function(){
      validate($(this))
      $(this).mask('00/00/0000');
   }) 

   $('body').on('blur', '#time', function(){
      validate($(this))
      $(this).mask('00:00');
   })

   $('body').on('blur', '#cep', function(){
      validate($(this))
      $(this).mask('00000-000');
   })

   $('body').on('blur', '#phone', function(){
      validate($(this))
      $(this).mask('00000-0000');
   })

   $('body').on('blur', '#cpf', function(){
      validate($(this))
      $(this).mask('000.000.000-00');
   })

})
