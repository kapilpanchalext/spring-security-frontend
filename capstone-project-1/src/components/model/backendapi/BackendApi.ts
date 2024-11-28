const LINKMAP = new Map();
const PROTOCOL = "http";
const HOST = "localhost";
const PORT = 9001;
const BASE_URL = `${PROTOCOL}://${HOST}:${PORT}`;

LINKMAP.set('/register-student',            new URL(`${BASE_URL}/register-student`));
LINKMAP.set('/assign-roles',                new URL(`${BASE_URL}/assign-roles`));
LINKMAP.set('/get-logged-student-details',  new URL(`${BASE_URL}/get-logged-student-details`));
LINKMAP.set('/get-students-list-by-email',  new URL(`${BASE_URL}/get-students-list-by-email`));
LINKMAP.set('/get-student-count',           new URL(`${BASE_URL}/get-student-count`));

export default LINKMAP;