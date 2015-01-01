class Classroom {
 
    constructor(...students) {
        this.students = students;
    }
 
    *[Symbol.iterator]() {
        for(let s of this.students) yield s;
    }
}
 
var scienceClass = new Classroom("Tim", "Sue", "Joy");
 
for(let student of scienceClass){
  console.log(student)
}
 