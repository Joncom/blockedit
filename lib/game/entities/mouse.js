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

        // Returns TRUE if entity is within tile.
        // Else returns FALSE.
        entityInTile: function( tileX, tileY, entity ) {

            var tilesize = ig.game.backgroundMaps[0].tilesize;

            // Check top left corner.

            var topLeftX = Math.floor( entity.pos.x / tilesize );

            var topLeftY = Math.floor( entity.pos.y / tilesize );

            if( topLeftX === tileX && topLeftY === tileY ) return true;

            // Check top right corner.

            var topRightX = Math.floor( ( entity.pos.x + entity.size.x - 1 ) / tilesize );

            var topRightY = Math.floor( entity.pos.y / tilesize );

            if( topRightX === tileX && topRightY === tileY ) return true;

             // Check bottom left corner.

            var bottomLeftX = Math.floor( entity.pos.x / tilesize );

            var bottomLeftY = Math.floor( ( entity.pos.y + entity.size.y - 1 ) / tilesize );

            if( bottomLeftX === tileX && bottomLeftY === tileY ) return true;

            // Check bottom right corner.

            var bottomRightX = Math.floor( ( entity.pos.x + entity.size.x - 1 ) / tilesize );

            var bottomRightY = Math.floor( ( entity.pos.y + entity.size.y - 1 ) / tilesize );

            if( bottomRightX === tileX && bottomRightY === tileY ) return true;

            // Entity is not within tile.
            return false;

        },

        update: function() {

            this.parent();

            if( ig.input.pressed('mouse1') ) {

                var tile = this.getTilePos( ig.input.mouse.x, ig.input.mouse.y );

                console.log("clicked on tile: " + tile.x + ',' + tile.y);

                if( ! this.entityInTile( tile.x, tile.y, ig.game.player ) ) {

                    this.setTile( tile.x, tile.y );

                } else console.log("Can't put tile where player is.");

            } else if( ig.input.pressed('mouse2') ) {

                var tile = this.getTilePos( ig.input.mouse.x, ig.input.mouse.y );

                console.log("clicked on tile: " + tile.x + ',' + tile.y);

                this.removeTile( tile.x, tile.y );

            }

        }

    });

});