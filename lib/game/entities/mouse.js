ig.module('game.entities.mouse')

.requires('impact.entity')

.defines(function() {

    EntityMouse = ig.Entity.extend({

        _wmIgnore: true,

        init: function(x, y, settings) {

            this.parent(x, y, settings);

        },

        // Converts pixel coordinates into tile coordinates.
        getTilePos: function( pixelX, pixelY ) {

            var tilesize = ig.game.backgroundMaps[0].tilesize;

            var tileX = Math.floor( pixelX / tilesize );

            var tileY = Math.floor( pixelY / tilesize );

            return { x: tileX, y: tileY };

        },

        setTile: function( x, y ) {

            ig.game.backgroundMaps[0].data[y][x] = 3;

            ig.game.collisionMap.data[y][x] = 1;

        },

        removeTile: function( x, y ) {

            ig.game.backgroundMaps[0].data[y][x] = 0;

            ig.game.collisionMap.data[y][x] = 0;

        },

        update: function() {

            this.parent();

            if( ig.input.pressed('mouse1') ) {

                var tile = this.getTilePos( ig.input.mouse.x, ig.input.mouse.y );

                console.log("clicked on tile: " + tile.x + ',' + tile.y);

                this.setTile( tile.x, tile.y );

            } else if( ig.input.pressed('mouse2') ) {

                var tile = this.getTilePos( ig.input.mouse.x, ig.input.mouse.y );

                console.log("clicked on tile: " + tile.x + ',' + tile.y);

                this.removeTile( tile.x, tile.y );

            }

        }

    });

});