module.exports = class Classroom {
    constructor() {
        this.students = ["朴大", "桑", "唐"];
    }
 
    [Symbol.iterator]() {
         var index = 0;
         return {
            next: () => {
                if(index < this.students.length){
                     index += 1;
                     return {done: false, value: this.students[index-1]};
                }
                return { value: undefined, done: true };
            }
         }
    }
}