const { exec } = require('child_process');

const new_project = async function({ debug, pgPool }, job) {
  await call_python("Project", job.payload, "insert");
}

const new_project_comment = async function({ debug, pgPool }, job) {
  await call_python("ProjectComment", job.payload, "insert");
}

const new_project_follow = async function({ debug, pgPool }, job) {
  await call_python("ProjectFollow", job.payload, "insert");
}

const new_project_member = async function({ debug, pgPool }, job) {
  await call_python("ProjectMember", job.payload, "insert");
}

const new_project_member_request = async function({ debug, pgPool }, job) {
  await call_python("ProjectMemberRequest", job.payload, "insert");
}

const new_user = async function({ debug, pgPool }, job) {
  await call_python("User", job.payload, "insert");
}

const new_user_image = async function({ debug, pgPool }, job) {
  await call_python("UserImage", job.payload, "insert");
}

const new_user_location = async function({ debug, pgPool }, job) {
  await call_python("UserLocation", job.payload, "insert");
}

const delete_project = async function({ debug, pgPool }, job) {
  await call_python("Project", job.payload, "delete");
}

const delete_project_comment = async function({ debug, pgPool }, job) {
  await call_python("ProjectComment", job.payload, "delete");
}

const delete_project_follow = async function({ debug, pgPool }, job) {
  await call_python("ProjectFollow", job.payload, "delete");
}

const delete_project_member = async function({ debug, pgPool }, job) {
  await call_python("ProjectMember", job.payload, "delete");
}

const delete_project_member_request = async function({ debug, pgPool }, job) {
  await call_python("ProjectMemberRequest", job.payload, "delete");
}

const delete_user = async function({ debug, pgPool }, job) {
  await call_python("User", job.payload, "delete");
}

const delete_user_image = async function({ debug, pgPool }, job) {
  await call_python("UserImage", job.payload, "delete");
}

const delete_user_location = async function({ debug, pgPool }, job) {
  await call_python("UserLocation", job.payload, "delete");
}

const call_python = async function (collection, argString, operation){
  exec('python3 src/tasks/com.py ' + operation + " '" + JSON.stringify(argString) + "' " + collection, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      return;
    }
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

module.exports = {
  new_project,
  new_project_comment,
  new_project_follow,
  new_project_member,
  new_project_member_request,
  new_user,
  new_user_image,
  new_user_location,
  delete_project,
  delete_project_comment,
  delete_project_follow,
  delete_project_member,
  delete_project_member_request,
  delete_user,
  delete_user_image,
  delete_user_location
};
