module.exports = class Classroom {
 
    constructor(...students) {
        this.students = students;
    }
 
    *[Symbol.iterator]() {
        for(let s of this.students) yield s;
    }
}
 