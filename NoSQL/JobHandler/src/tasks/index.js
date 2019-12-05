const { exec } = require('child_process');

const new_project = async function({ debug, pgPool }, job) {
  await call_python("ProjectUpdate", job.payload);
}

const new_project_comment = async function({ debug, pgPool }, job) {
  await call_python("ProjectCommentUpdate", job.payload);
}

const new_project_follow = async function({ debug, pgPool }, job) {
  await call_python("ProjectFollowUpdate", job.payload);
}

const new_project_member = async function({ debug, pgPool }, job) {
  await call_python("ProjectMemberUpdate", job.payload);
}

const new_project_member_request = async function({ debug, pgPool }, job) {
  await call_python("ProjectMemberRequestUpdate", job.payload);
}

const new_user = async function({ debug, pgPool }, job) {
  await call_python("UserUpdate", job.payload);
}

const new_user_image = async function({ debug, pgPool }, job) {
  await call_python("UserImageUpdate", job.payload);
}

const new_user_location = async function({ debug, pgPool }, job) {
  await call_python("UserLocationUpdate", job.payload);
}

const delete_project = async function({ debug, pgPool }, job) {
  await call_python("ProjectDelete", job.payload);
}

const delete_project_comment = async function({ debug, pgPool }, job) {
  await call_python("ProjectCommentDelete", job.payload);
}

const delete_project_follow = async function({ debug, pgPool }, job) {
  await call_python("ProjectFollowDelete", job.payload);
}

const delete_project_member = async function({ debug, pgPool }, job) {
  await call_python("ProjectMemberDelete", job.payload);
}

const delete_project_member_request = async function({ debug, pgPool }, job) {
  await call_python("ProjectMemberRequestDelete", job.payload);
}

const delete_user = async function({ debug, pgPool }, job) {
  await call_python("UserDelete", job.payload);
}

const delete_user_image = async function({ debug, pgPool }, job) {
  await call_python("UserImageDelete", job.payload);
}

const delete_user_location = async function({ debug, pgPool }, job) {
  await call_python("UserLocationDelete", job.payload);
}

const call_python = async function (filename, argString){
  exec('python3 ' + filename + argString, (err, stdout, stderr) => {
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