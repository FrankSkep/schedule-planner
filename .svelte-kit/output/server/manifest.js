export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "schedule-planner/_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.9ONRXVLt.js",app:"_app/immutable/entry/app.BI-c8hKK.js",imports:["_app/immutable/entry/start.9ONRXVLt.js","_app/immutable/chunks/CA9MndOV.js","_app/immutable/chunks/lD0y4cry.js","_app/immutable/chunks/DCg_aJdg.js","_app/immutable/entry/app.BI-c8hKK.js","_app/immutable/chunks/lD0y4cry.js","_app/immutable/chunks/BP03wRky.js","_app/immutable/chunks/DUHHJbdK.js","_app/immutable/chunks/DCg_aJdg.js","_app/immutable/chunks/BKmYrnvO.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/schedule-planner/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
