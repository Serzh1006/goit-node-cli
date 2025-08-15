const { program } = require("commander");
const contacts = require("./contacts");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then((res) => console.table(res));
      break;

    case "get":
      contacts.getContactById(id).then((res) => console.table(res));
      break;

    case "add":
      contacts.addContact(name, email, phone).then((res) => console.table(res));
      break;

    case "remove":
      contacts.removeContact(id).then((res) => console.table(res));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
