SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "local:": "jspm_packages/local/",
    "skeletor-plugin-accordion/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  transpiler: "plugin-babel",
  packages: {
    "skeletor-plugin-accordion": {
      "main": "skeletor-plugin-accordion.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  },
  map: {
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.16"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "local:*.json"
  ],
  map: {
    "skeletor-core": "local:skeletor-core@3.0.0",
    "skeletor-plugin-base": "local:skeletor-plugin-base@0.1.0"
  },
  packages: {
    "local:skeletor-plugin-base@0.1.0": {
      "map": {
        "skeletor": "local:skeletor@3.0.0",
        "skeletor-core": "local:skeletor-core@3.0.0"
      }
    },
    "local:skeletor-core@3.0.0": {
      "map": {
        "jquery": "npm:jquery@3.1.1"
      }
    }
  }
});
