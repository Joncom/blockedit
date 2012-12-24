ig.module('game.entities.mouse')

.requires('impact.entity')

.defines(function() {

    EntityMouse = ig.Entity.extend({

        _wmIgnore: true,

        init: function(x, y, settings) {

            this.parent(x, y, settings);

        },

        update: function() {

            this.parent();

            if( ig.input.pressed('mouse1') ) {

                console.log("mouse1 pressed.");

            } else if( ig.input.pressed('mouse2') ) {

                console.log("mouse2 pressed.");

            }

        }

    });

});