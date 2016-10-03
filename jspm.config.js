SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "local:": "jspm_packages/local/",
    "skeletor-plugin-accordion/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.15"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "skeletor-plugin-accordion": {
      "main": "accordion.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "local:*.json"
  ],
  map: {
    "skeletor": "local:skeletor@2.0.0"
  },
  packages: {
    "local:skeletor@2.0.0": {
      "map": {
        "jquery": "npm:jquery@3.1.1"
      }
    }
  }
});
