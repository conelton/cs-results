"use strict";

document.addEventListener("DOMContentLoaded", event => {
  ReactDOM.render(
    <Form courses={courses} modules={modules} />,
    document.getElementById("reactRoot")
  );
});

const courses = {
  compsci: {
    label: "Computer Science",
    semesters: [
      ["1003", "1008", "1012", "1016"],
      ["1001", "1005", "1019"],
      ["2001", "2006", "2011", "2012"],
      ["2008", "2015", "2016", "2017"],
    ],
  },
  computing: {
    label: "Computing",
    semesters: [
      ["1003", "1008", "1097", "1098"],
      ["1005", "1019", "1094"],
      ["2001", "2006", "2012", "1016"],
      ["2002", "2015", "2016", "2017"],
    ],
  },
};

const modules = {
  "1001": { title: "Logic and Problem Solving", credits: 20 },
  "1003": { title: "Program Design", credits: 20 },
  "1005": { title: "Data Structures and Development Environments", credits: 20 },
  "1008": { title: "Requirements Engineering and Professional Practice", credits: 10 },
  "1012": { title: "Discrete Structures", credits: 10 },
  "1016": { title: "Computer Systems", credits: 20 },
  "1019": { title: "Databases and Web Applications", credits: 20 },
  "1094": { title: "Computers and Society", credits: 20 },
  "1097": { title: "Internet Computing", credits: 10 },
  "1098": { title: "Information Management", credits: 10 },
  "2001": { title: "User Interfaces and HCI", credits: 10 },
  "2002": { title: "Financial and Business Computing", credits: 10 },
  "2006": { title: "Software Engineering and System Development", credits: 20 },
  "2008": { title: "Functional Programming", credits: 10 },
  "2011": { title: "Automata, Languages and Computation", credits: 20 },
  "2012": { title: "Software Project Management and Professionalism", credits: 10 },
  "2015": { title: "Software Engineering Project", credits: 20 },
  "2016": { title: "Multimedia and Computer Graphics", credits: 10 },
  "2017": { title: "Operating Systems, Networks and Distributed Systems", credits: 20 },
};

class Form extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      courseId: null,
      marks: new Map()
    };
  }
  
  getCourse() {
    if (this.state.courseId === null)
      return null;
    return this.props.courses[this.state.courseId];
  }
  
  getCourseSemesters() {
    let course = this.getCourse();
    if (course === null)
      return null;
    return course.semesters.map(semester => {
      return semester.map(moduleId => {
        let module = this.props.modules[moduleId];
        return Object.assign({ id: moduleId }, module);
      });
    });
  }
  
  onCourseChange(courseId) {
    this.setState({ courseId });
  }
  
  onModuleMarkChange(moduleId, mark) {
    let marks = this.state.marks;
    if (mark === null) {
      marks.delete(moduleId);
    }
    else {
      marks.set(moduleId, mark);
    }
    this.setState({ marks });
  }
  
  render() {
    let content;
    if (this.state.courseId === null) {
      content = (
        <div className="instructions">
          <p>Select a course. Your results will be shown at the bottom of the page once you have filled in your marks.</p>
        </div>
      );
    }
    else {
      content = (
        <ModulesForm
          semesters={this.getCourseSemesters()}
          onModuleMarkChange={this.onModuleMarkChange.bind(this)}
        />
      );
    }
    return (
      <div>
        <CourseSelector
          courses={this.props.courses}
          onChange={this.onCourseChange.bind(this)}
        />
        {content}
        <Results
          marks={this.state.marks}
          modules={this.props.modules}
        />
      </div>
    );
  }
  
}

class CourseSelector extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      courseId: null
    };
  }
  
  onChange(courseId) {
    this.props.onChange(courseId);
    this.setState({ courseId });
  }
  
  render() {
    let options = Object.keys(this.props.courses).map(courseId => {
      let course = this.props.courses[courseId];
      return Object.assign({ id: courseId }, course);
    })
    .map(course => (
      <CourseSelectorOption
        key={course.id}
        course={course}
        onChange={this.onChange.bind(this)}
        checked={course.id === this.state.courseId}
      />
    ));
    return (
      <div className="course-form-wrapper">
        <form className="course-form">{options}</form>
      </div>
    );
  }
  
}

class CourseSelectorOption extends React.Component {
  
  onChange(event) {
    this.props.onChange(this.props.course.id);
  }
  
  render() {
    let inputId = `courseSelector-${this.props.course.id}`
    return (
      <div className="course-option">
        <input
          id={inputId}
          type="radio"
          name="course"
          value={this.props.course.id}
          onChange={this.onChange.bind(this)}
          checked={this.props.checked}
        />
        <label htmlFor={inputId}>{this.props.course.label}</label>
      </div>
    );
  }
  
}

class ModulesForm extends React.Component {
  
  render() {
    let rows = this.props.semesters.reduce((rows, semester, semesterIndex) => {
      let semesterNumber = (semesterIndex & 1) + 1;
      let yearNumber = (semesterIndex >> 1) + 1;
      rows.push(
        <tr className="divider-row" key={`y${yearNumber}s${semesterNumber}`}>
          <th colSpan="4">
            {`Year ${yearNumber}, Semester ${semesterNumber}`}
          </th>
        </tr>
      );
      return rows.concat(semester.map((module, moduleIndex) => {
        return (
          <ModuleRow
            key={module.id}
            module={module}
            onMarkChange={this.props.onModuleMarkChange}
          />
        );
      }));
    }, []);
    return (
      <form className="module-form">
        <table>
          <thead>
            <tr className="header-row">
              <th>Code</th>
              <th>Title</th>
              <th>Credits</th>
              <th>Your mark</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </form>
    );
  }
  
}

class ModuleRow extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      mark: null
    };
  }
  
  onMarkChange(mark) {
    this.props.onMarkChange(this.props.module.id, mark);
  }
  
  render() {
    return (
      <tr className="module-row">
        <td>{"CO" + this.props.module.id}</td>
        <td>{this.props.module.title}</td>
        <td className="align-right">{this.props.module.credits}</td>
        <td className="align-right">
          <ModuleMarkInput
            onChange={this.onMarkChange.bind(this)}
          />
        </td>
      </tr>
    );
  }
  
}

class ModuleMarkInput extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      empty: true,
      valid: false,
    };
  }
  
  onChange(event) {
    let input = event.target.value.trim();
    let empty = (input === "");
    let valid = false;
    if (empty) {
      this.setState({ empty, valid });
      this.props.onChange(null);
    }
    else {
      let value = parseInt(input, 10);
      let valid = !(Number.isNaN(value) || value < 0 || value > 100);
      this.setState({ empty, valid });
      this.props.onChange(valid ? value : null);
    }
  }
  
  render() {
    let classes = ["mark-input"];
    if (!this.state.empty) {
      classes.push(this.state.valid ? "valid" : "invalid");
    }
    return (
      <input
        type="number"
        min="0"
        max="100"
        step="1"
        className={classes.join(" ")}
        onChange={this.onChange.bind(this)}
      />
    );
  }
  
}

class Results extends React.Component {
  
  render() {
    let marks = this.props.marks;
    if (marks.size === 0) {
      return null;
    }
    let possible = 0;
    let actual = 0;
    for (let [moduleId, mark] of marks) {
      let credits = this.props.modules[moduleId].credits;
      possible += credits;
      actual += credits * (mark / 100);
    }
    let average = (actual / possible) * 100;
    let classification;
    switch (true) {
      case average < 40:
        classification = "fail";
        break;
      case average < 50:
        classification = "pass";
        break;
      case average < 60:
        classification = "2:2";
        break;
      case average < 70:
        classification = "2:1";
        break;
      default:
        classification = "1st";
        break;
    }
    return (
      <div className="results">
        <h2>Your Results</h2>
        <p>Total <output>{actual.toFixed(1)}</output> credits out of a possible <output>{possible}</output></p>
        <p>Your weighted average module mark is <output>{average.toFixed(1)}</output>%</p>
        <p>That puts you on a <output>{classification}</output></p>
      </div>
    );
  }
  
}