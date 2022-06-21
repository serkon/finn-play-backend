import fs from "fs";
import path from "path";

export default class JsonManager {
  data: any = [];
  result: { [x: string]: any }[] = [];
  rootPath = null;

  constructor(filePath: string) {
    this.data = this.read(filePath);
    this.props();
  }

  props(paths?: string[]) {
    if (this.data.length > 0) {
      paths = paths || Object.keys(this.data[0]);
      const data: { [x: string]: any }[] = this.data.map(
        (item: any) =>
          paths &&
          paths.reduce(
            (first: { [x: string]: any }, key: string | number) => (
              // eslint-disable-next-line no-sequences
              (first[key] = item[key]), first
            ),
            {},
          ),
      ) as { [x: string]: any }[];
      this.result = data;
    }
    return this;
  }

  root(path?: string) {
    this.data = path ? this.data[path] : this.data;
    this.props();
    return this;
  }

  export(path: string, location: string) {
    this.result = this.result.map((item, key) => {
      item[location] = this.resolve(path, this.data[key]);
      return item;
    });
    return this;
  }

  move(path: string, location: string) {
    this.result = this.result.map((item, key) => {
      if (Array.isArray(location.split("."))) {
        const str = this.setObjectPathValue(location, this.resolve(path, this.data[key]));
        item[Object.keys(str)[0]] = { ...item[Object.keys(str)[0]], ...str[Object.keys(str)[0]] };
      } else {
        item[location] = this.resolve(path, this.data[key]);
      }
      return item;
    });
    return this;
  }

  setObjectPathValue(prop: string, value: any) {
    const props = prop.split(".");
    let temp: any = {};
    props.reverse().forEach(function (key: any, index: number) {
      if (index === 0) {
        temp[key] = value || null;
      } else {
        const hold = temp;
        temp = {};
        temp[key] = hold;
      }
    });
    return temp;
  }

  resolve(path: string, obj = self, separator = ".") {
    const properties: string[] = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce(
      // eslint-disable-next-line
      (prev: any, curr: any) => prev && prev[curr],
      obj as any,
    );
  }

  read(pathname: any) {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", ".." + pathname), "utf-8"));
  }

  static write(path: string, ...data: any[][]) {
    fs.writeFileSync(path, JSON.stringify(data.length > 1 ? JsonManager.merge(...data) : data[0]));
  }

  static merge(...args: any[]) {
    const [first, ...rest] = args;
    return first.map((item: any, key: string | number) => {
      const merge = rest.map((object) => object[key]).reduce((acc, curr) => ({ ...acc, ...curr }));
      return { ...item, ...merge };
    });
  }
}

/**
 const personal = new JsonManager('./data/personal.json').root(['objects']);
const user = new JsonManager('./data/users.json')
  .root('results')
  .props(['gender', 'phone', 'email', 'location', 'picture', 'login'])
  .export('name.first', 'name')
  .export('name.last', 'surname')
  .move('login.password', 'employee.password')
  .move('login.uuid', 'employee.uuid');
// .export('login.username', 'employee');
const jobs = new JsonManager('./data/job.json').root('objects');
const cc = new JsonManager('./data/credit-card.json').props(['credit']);
cc.export('CreditCard', 'credit');
JsonManager.write(
  './data/merge.json',
  personal.result,
  user.result,
  cc.result,
  jobs.result
);

 */
/* const fix = new JsonManager("./data/merge.json").props([
    "id",
    "name",
    "surname",
    "gender",
    "picture",
    "birthday",
    "email",
    "phone",
    "location",
    "university",
    "ip",
    "title",
    "department",
    "start_date",
    "salary",
    "credit",
    "login",
]);

JsonManager.write("./data/merge.json", fix.result); */
