+function (root) {
    root.app = root.app || {};
    /**
     * This is used for namespacing and registring items into the app namespace. 
     */
    root.app.register = function (name, fn) {
        var value = fn(root.ng);
        value.overriddenName = name;
        root.app[name] = value;
    }
}(window);