const domain = "https://taskdo-server.vercel.app";

const Urls = {
    domain,
    host: `${domain}/`,
    baseUrl: `${domain}/api`,
    // login
    authenticate: "/login",
    // register
    register: "/signup",
    // tasks
    tasks: "/tasks",
    // users
    users: "/users",
};

export default Urls;
