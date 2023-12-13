// Person class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.healthRate = 100;
    this.money = 1000;
  }

  //Sets the work mood based on the number of hours slept.
  sleep(hours) {
    if (hours === 7) {
      this.workMood = "happy";
    } else if (hours < 7) {
      this.workMood = "tired";
    } else {
      this.workMood = "lazy";
    }
  }

  //Updates the health rate based on the number of meals eaten.
  eat(meals) {
    if (meals === 3) {
      this.healthRate = 100;
    } else if (meals === 2) {
      this.healthRate = 75;
    } else {
      this.healthRate = 50;
    }
  }

  //Decreases the amount of money based on the number of items bought.
  buy(items) {
    this.money -= items * 10;
  }
}

// Employee class (inherits from Person)
class Employee extends Person {
  constructor(name, age, email, salary, isManager) {
    super(name, age);
    this.id = email; // use email as id
    this.email = email;
    this.salary = salary;
    this.isManager = isManager;
  }

  //Updates the work mood based on the number of hours worked.
  work(hours) {
    if (hours === 8) {
      this.workMood = "happy";
    } else if (hours > 8) {
      this.workMood = "tired";
    } else {
      this.workMood = "lazy";
    }
  }

  // getter and setter for salary
  get salary() {
    return this._salary;
  }

  set salary(value) {
    if (value >= 1000) {
      this._salary = value;
    } else {
      throw new Error("Salary must be 1000 or more");
    }
  }

  // getter and setter for healthRate
  get healthRate() {
    return this._healthRate;
  }

  set healthRate(value) {
    if (value >= 0 && value <= 100) {
      this._healthRate = value;
    } else {
      throw new Error("Health rate must be between 0 and 100");
    }
  }
}

// Office class
class Office {
  constructor(name, employees) {
    this.name = name;
    this.employees = []; // use array to store employees
  }

  getAllEmployees() {
    return this.employees;
  }

  // find employee by id
  getEmployee(empId) {
    let employee = this.employees.find((emp) => emp.id === empId);
    if (employee) {
      // if employee is a manager, hide salary
      if (employee.isManager) {
        return {
          id: employee.id,
          email: employee.email,
          workMood: employee.workMood,
          isManager: employee.isManager,
        };
      } else {
        // otherwise, return all info
        return employee;
      }
    } else {
      // if employee not found, return null
      return null;
    }
  }

  hire(employee) {
    // add employee to array
    this.employees.push(employee);
  }

  fire(empId) {
    // remove employee from array by id
    this.employees = this.employees.filter((emp) => emp.id !== empId);
  }
}

// User prompt program
let office = new Office("abc"); // create an office object
let input; // variable to store user input
do {
  // print menu
  console.log("Welcome to the office management program");
  console.log("Please choose an option:");
  console.log("add - to add a new employee");
  console.log("get - to get an employee's info");
  console.log("all - to get all employees' info");
  console.log("hire - to hire an employee");
  console.log("fire - to fire an employee");
  console.log("q - to quit the program");

  // get user input
  input = prompt("Enter your choice: ");

  // handle user input
  switch (input) {
    case "add":
      // get employee data from user
      let name = prompt("Enter name: ");
      let age = prompt("Enter age: ");
      let email = prompt("Enter email: ");
      let salary = prompt("Enter salary: ");
      let isManager = prompt("Is manager? (y/n): ");

      // create employee object
      let employee = new Employee(
        name,
        age,
        email,
        salary,
        isManager === "y" ? true : false
      );

      // add employee to office
      office.hire(employee);

      // print confirmation message
      console.log("Employee added successfully");
      break;

    case "get":
      // get employee id from user
      let empId = prompt("Enter employee id: ");

      // get employee info from office
      let empInfo = office.getEmployee(empId);

      // print employee info or error message
      if (empInfo) {
        console.log("Employee info: ", empInfo);
      } else {
        console.log("Employee not found");
      }
      break;

    case "all":
      // get all employees info from office
      let allEmps = office.getAllEmployees();

      // print all employees info
      console.log("All employees info: ", allEmps);
      break;

    case "hire":
      // get employee id from user
      let hireId = prompt("Enter employee id to hire: ");

      // get employee object from office
      let hireEmp = office.getEmployee(hireId);

      // hire employee or print error message
      if (hireEmp) {
        office.hire(hireEmp);
        console.log("Employee hired successfully");
      } else {
        console.log("Employee not found");
      }
      break;

    case "fire":
      // get employee id from user
      let fireId = prompt("Enter employee id to fire: ");

      // get employee object from office
      let fireEmp = office.getEmployee(fireId);

      // fire employee or print error message
      if (fireEmp) {
        office.fire(fireEmp);
        console.log("Employee fired successfully");
      } else {
        console.log("Employee not found");
      }
      break;

    case "q":
      // quit the program
      console.log("Thank you for using the program");
      break;

    default:
      // invalid input
      console.log("Invalid option, please try again");
      break;
  }
} while (input !== "q");
