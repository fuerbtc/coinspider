define(['jquery',
    'backbone',
    'collections/tickers',
    'models/ticker'],function($,Backbone,Tickers,Ticker){

    var exchangers = Backbone.View.extend({
        el : '#exchangers',

        initialize : function() {
            this.exchangers = new Tickers(null, {
                view: this
            });

            this.exchangers.add(new Ticker({
                //Las propiedades que quieres inicializar aqui

            }));

            //Añades tantos exchangers como Proveedores quieres incluir
        },

        render : function() {
            //Buscan el template en el propio Html
            var rate_select_template = _.template($("#rate_select_template").html(), {
                rates: this.rates,
                labelValue: 'Something'
            });
            $('#rate-editor-container').html(rate_select_template);

            //Se deberia invocar al plugin Chosen aqui!, porque la lista todavia no esta
            //llena
        }
    });
});
//Ver
//  http://jsfiddle.net/ambiguous/AEqjn/


//El Template
//<script type="text/template" id="rate_select_template">
//    <select id="rate-selector">
//        <% rates.each(function(rate) { %>
//            <option value="<%= rate.get('duration') %>"><%= rate.get('duration') %></option>
//        <% }); %>
//            </select>
//            </script>
//
//            <div id="rate-editor-container"></div>



//Ojo, es mejor que la colleccion este fuera de esta vista!
//http://stackoverflow.com/questions/10341141/backbone-multiple-views-subscribing-to-a-single-collections-event-is-this-a-b

//El aproach seria actualiar el modelo
//Que actualizaria la collecion? y la vista....
//Puta que dificial   http://anthonyshort.me/2012/02/syncing-models-with-backbone-js

//Pitfalls
//http://ozkatz.github.io/avoiding-common-backbonejs-pitfalls.html