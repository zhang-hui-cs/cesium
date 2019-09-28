define([
    '../Core/defaultValue',
    '../Core/defined',
    '../Core/DoublyLinkedList'
], function(defaultValue, defined, DoublyLinkedList) {
    'use strict';

    /**
     * Stores tiles with content loaded.
     *
     * @private
     */
    function WebMapTileServiceImageryCache(options) {
        // [head, sentinel) -> tiles that weren't selected this frame and may be removed from the cache
        // (sentinel, tail] -> tiles that were selected this frame
        this._list = new DoublyLinkedList();

        this._mapKeyNode = {};

        if (defined(options)) {
            this._maxLength = defaultValue(options.maxLength, 1000);
        } else {
            this._maxLength = 1000;
        }
    }

    WebMapTileServiceImageryCache.prototype.touch = function(key) {
        if (key && this._mapKeyNode[key]) {
            var node = this._mapKeyNode[key];
            if (defined(node)) {
                this._list.splice(this._list.tail, node);
            }
        }
    };

    WebMapTileServiceImageryCache.prototype.clear = function() {
        var node = this._list.head;
        while (node !== this._list.tail) {
            var item = node.item;
            var nextNode = node.next;
            this._list.remove(node);

            if (item.key && this._mapKeyNode[item.key]) {
                delete this._mapKeyNode[item.key];
            }

            var key;
            for (key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    delete item[key];
                }
            }

            node = nextNode;
        }

        this._mapKeyNode = {};
        this._list = new DoublyLinkedList();
    };

    WebMapTileServiceImageryCache.prototype.add = function(key, promiseItem) {
        if (!this._mapKeyNode[key] && promiseItem) {
            this.unload();

            var node = this._list.add({ promise: promiseItem });
            node.item.key = key;
            promiseItem.then(function(img) {
                if (node.item.key) {
                    node.item.image = img;
                }
            });

            this._mapKeyNode[key] = node;
        }

        return this._mapKeyNode[key];
    };

    WebMapTileServiceImageryCache.prototype.unload = function() {
        var node = this._list.head;
        while (this._list.length > this._maxLength) {
            var item = node.item;
            var nextNode = node.next;
            this._list.remove(node);

            if (item.key && this._mapKeyNode[item.key]) {
                delete this._mapKeyNode[item.key];
            }

            for (var key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    delete item[key];
                }
            }

            node = nextNode;
        }
    };

    WebMapTileServiceImageryCache.prototype.getFromCache = function(key) {
        if (this._mapKeyNode[key]) {
            var node = this._mapKeyNode[key];
            if (node.item.image) {
                this.touch(key);
                return Promise.resolve(node.item.image);
            } else if (node.item.promise) {
                this.touch(key);
                return node.item.promise;
            }
        }
    };

    WebMapTileServiceImageryCache.getKey = function(x, y, level) {
        return x + '-' + y + '-' + level;
    };

    return WebMapTileServiceImageryCache;
});
