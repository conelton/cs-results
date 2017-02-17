"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

document.addEventListener("DOMContentLoaded", function (event) {
  ReactDOM.render(React.createElement(Form, { courses: courses, modules: modules }), document.getElementById("reactRoot"));
});

var courses = {
  compsci: {
    label: "Computer Science",
    semesters: [["1003", "1008", "1012", "1016"], ["1001", "1005", "1019"], ["2001", "2006", "2011", "2012"], ["2008", "2015", "2016", "2017"]]
  },
  computing: {
    label: "Computing",
    semesters: [["1003", "1008", "1097", "1098"], ["1005", "1019", "1094"], ["2001", "2006", "2012", "1016"], ["2002", "2015", "2016", "2017"]]
  }
};

var modules = {
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
  "2017": { title: "Operating Systems, Networks and Distributed Systems", credits: 20 }
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.state = {
      courseId: null,
      marks: new Map()
    };
    return _this;
  }

  _createClass(Form, [{
    key: "getCourse",
    value: function getCourse() {
      if (this.state.courseId === null) return null;
      return this.props.courses[this.state.courseId];
    }
  }, {
    key: "getCourseSemesters",
    value: function getCourseSemesters() {
      var _this2 = this;

      var course = this.getCourse();
      if (course === null) return null;
      return course.semesters.map(function (semester) {
        return semester.map(function (moduleId) {
          var module = _this2.props.modules[moduleId];
          return Object.assign({ id: moduleId }, module);
        });
      });
    }
  }, {
    key: "onCourseChange",
    value: function onCourseChange(courseId) {
      this.setState({ courseId: courseId });
    }
  }, {
    key: "onModuleMarkChange",
    value: function onModuleMarkChange(moduleId, mark) {
      var marks = this.state.marks;
      if (mark === null) {
        marks.delete(moduleId);
      } else {
        marks.set(moduleId, mark);
      }
      this.setState({ marks: marks });
    }
  }, {
    key: "render",
    value: function render() {
      var content = void 0;
      if (this.state.courseId === null) {
        content = React.createElement(
          "div",
          { className: "instructions" },
          React.createElement(
            "p",
            null,
            "Select a course. Your results will be shown at the bottom of the page once you have filled in your marks."
          )
        );
      } else {
        content = React.createElement(ModulesForm, {
          semesters: this.getCourseSemesters(),
          onModuleMarkChange: this.onModuleMarkChange.bind(this)
        });
      }
      return React.createElement(
        "div",
        null,
        React.createElement(CourseSelector, {
          courses: this.props.courses,
          onChange: this.onCourseChange.bind(this)
        }),
        content,
        React.createElement(Results, {
          marks: this.state.marks,
          modules: this.props.modules
        })
      );
    }
  }]);

  return Form;
}(React.Component);

var CourseSelector = function (_React$Component2) {
  _inherits(CourseSelector, _React$Component2);

  function CourseSelector(props) {
    _classCallCheck(this, CourseSelector);

    var _this3 = _possibleConstructorReturn(this, (CourseSelector.__proto__ || Object.getPrototypeOf(CourseSelector)).call(this, props));

    _this3.state = {
      courseId: null
    };
    return _this3;
  }

  _createClass(CourseSelector, [{
    key: "onChange",
    value: function onChange(courseId) {
      this.props.onChange(courseId);
      this.setState({ courseId: courseId });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var options = Object.keys(this.props.courses).map(function (courseId) {
        var course = _this4.props.courses[courseId];
        return Object.assign({ id: courseId }, course);
      }).map(function (course) {
        return React.createElement(CourseSelectorOption, {
          key: course.id,
          course: course,
          onChange: _this4.onChange.bind(_this4),
          checked: course.id === _this4.state.courseId
        });
      });
      return React.createElement(
        "div",
        { className: "course-form-wrapper" },
        React.createElement(
          "form",
          { className: "course-form" },
          options
        )
      );
    }
  }]);

  return CourseSelector;
}(React.Component);

var CourseSelectorOption = function (_React$Component3) {
  _inherits(CourseSelectorOption, _React$Component3);

  function CourseSelectorOption() {
    _classCallCheck(this, CourseSelectorOption);

    return _possibleConstructorReturn(this, (CourseSelectorOption.__proto__ || Object.getPrototypeOf(CourseSelectorOption)).apply(this, arguments));
  }

  _createClass(CourseSelectorOption, [{
    key: "onChange",
    value: function onChange(event) {
      this.props.onChange(this.props.course.id);
    }
  }, {
    key: "render",
    value: function render() {
      var inputId = "courseSelector-" + this.props.course.id;
      return React.createElement(
        "div",
        { className: "course-option" },
        React.createElement("input", {
          id: inputId,
          type: "radio",
          name: "course",
          value: this.props.course.id,
          onChange: this.onChange.bind(this),
          checked: this.props.checked
        }),
        React.createElement(
          "label",
          { htmlFor: inputId },
          this.props.course.label
        )
      );
    }
  }]);

  return CourseSelectorOption;
}(React.Component);

var ModulesForm = function (_React$Component4) {
  _inherits(ModulesForm, _React$Component4);

  function ModulesForm() {
    _classCallCheck(this, ModulesForm);

    return _possibleConstructorReturn(this, (ModulesForm.__proto__ || Object.getPrototypeOf(ModulesForm)).apply(this, arguments));
  }

  _createClass(ModulesForm, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      var rows = this.props.semesters.reduce(function (rows, semester, semesterIndex) {
        var semesterNumber = (semesterIndex & 1) + 1;
        var yearNumber = (semesterIndex >> 1) + 1;
        rows.push(React.createElement(
          "tr",
          { className: "divider-row", key: "y" + yearNumber + "s" + semesterNumber },
          React.createElement(
            "th",
            { colSpan: "4" },
            "Year " + yearNumber + ", Semester " + semesterNumber
          )
        ));
        return rows.concat(semester.map(function (module, moduleIndex) {
          return React.createElement(ModuleRow, {
            key: module.id,
            module: module,
            onMarkChange: _this7.props.onModuleMarkChange
          });
        }));
      }, []);
      return React.createElement(
        "form",
        { className: "module-form" },
        React.createElement(
          "table",
          null,
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              { className: "header-row" },
              React.createElement(
                "th",
                null,
                "Code"
              ),
              React.createElement(
                "th",
                null,
                "Title"
              ),
              React.createElement(
                "th",
                null,
                "Credits"
              ),
              React.createElement(
                "th",
                null,
                "Your mark"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            rows
          )
        )
      );
    }
  }]);

  return ModulesForm;
}(React.Component);

var ModuleRow = function (_React$Component5) {
  _inherits(ModuleRow, _React$Component5);

  function ModuleRow(props) {
    _classCallCheck(this, ModuleRow);

    var _this8 = _possibleConstructorReturn(this, (ModuleRow.__proto__ || Object.getPrototypeOf(ModuleRow)).call(this, props));

    _this8.state = {
      mark: null
    };
    return _this8;
  }

  _createClass(ModuleRow, [{
    key: "onMarkChange",
    value: function onMarkChange(mark) {
      this.props.onMarkChange(this.props.module.id, mark);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        { className: "module-row" },
        React.createElement(
          "td",
          null,
          "CO" + this.props.module.id
        ),
        React.createElement(
          "td",
          null,
          this.props.module.title
        ),
        React.createElement(
          "td",
          { className: "align-right" },
          this.props.module.credits
        ),
        React.createElement(
          "td",
          { className: "align-right" },
          React.createElement(ModuleMarkInput, {
            onChange: this.onMarkChange.bind(this)
          })
        )
      );
    }
  }]);

  return ModuleRow;
}(React.Component);

var ModuleMarkInput = function (_React$Component6) {
  _inherits(ModuleMarkInput, _React$Component6);

  function ModuleMarkInput(props) {
    _classCallCheck(this, ModuleMarkInput);

    var _this9 = _possibleConstructorReturn(this, (ModuleMarkInput.__proto__ || Object.getPrototypeOf(ModuleMarkInput)).call(this, props));

    _this9.state = {
      empty: true,
      valid: false
    };
    return _this9;
  }

  _createClass(ModuleMarkInput, [{
    key: "onChange",
    value: function onChange(event) {
      var input = event.target.value.trim();
      var empty = input === "";
      var valid = false;
      if (empty) {
        this.setState({ empty: empty, valid: valid });
        this.props.onChange(null);
      } else {
        var value = parseInt(input, 10);
        var _valid = !(Number.isNaN(value) || value < 0 || value > 100);
        this.setState({ empty: empty, valid: _valid });
        this.props.onChange(_valid ? value : null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var classes = ["mark-input"];
      if (!this.state.empty) {
        classes.push(this.state.valid ? "valid" : "invalid");
      }
      return React.createElement("input", {
        type: "number",
        min: "0",
        max: "100",
        step: "1",
        className: classes.join(" "),
        onChange: this.onChange.bind(this)
      });
    }
  }]);

  return ModuleMarkInput;
}(React.Component);

var Results = function (_React$Component7) {
  _inherits(Results, _React$Component7);

  function Results() {
    _classCallCheck(this, Results);

    return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).apply(this, arguments));
  }

  _createClass(Results, [{
    key: "render",
    value: function render() {
      var marks = this.props.marks;
      if (marks.size === 0) {
        return null;
      }
      var possible = 0;
      var actual = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = marks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              moduleId = _step$value[0],
              mark = _step$value[1];

          var credits = this.props.modules[moduleId].credits;
          possible += credits;
          actual += credits * (mark / 100);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var average = actual / possible * 100;
      var classification = void 0;
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
      return React.createElement(
        "div",
        { className: "results" },
        React.createElement(
          "h2",
          null,
          "Your Results"
        ),
        React.createElement(
          "p",
          null,
          "Total ",
          React.createElement(
            "output",
            null,
            actual.toFixed(1)
          ),
          " credits out of a possible ",
          React.createElement(
            "output",
            null,
            possible
          )
        ),
        React.createElement(
          "p",
          null,
          "Your weighted average module mark is ",
          React.createElement(
            "output",
            null,
            average.toFixed(1)
          ),
          "%"
        ),
        React.createElement(
          "p",
          null,
          "That puts you on a ",
          React.createElement(
            "output",
            null,
            classification
          )
        )
      );
    }
  }]);

  return Results;
}(React.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zY3JpcHQuanN4Il0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIlJlYWN0RE9NIiwicmVuZGVyIiwiY291cnNlcyIsIm1vZHVsZXMiLCJnZXRFbGVtZW50QnlJZCIsImNvbXBzY2kiLCJsYWJlbCIsInNlbWVzdGVycyIsImNvbXB1dGluZyIsInRpdGxlIiwiY3JlZGl0cyIsIkZvcm0iLCJwcm9wcyIsInN0YXRlIiwiY291cnNlSWQiLCJtYXJrcyIsIk1hcCIsImNvdXJzZSIsImdldENvdXJzZSIsIm1hcCIsInNlbWVzdGVyIiwibW9kdWxlIiwibW9kdWxlSWQiLCJPYmplY3QiLCJhc3NpZ24iLCJpZCIsInNldFN0YXRlIiwibWFyayIsImRlbGV0ZSIsInNldCIsImNvbnRlbnQiLCJnZXRDb3Vyc2VTZW1lc3RlcnMiLCJvbk1vZHVsZU1hcmtDaGFuZ2UiLCJiaW5kIiwib25Db3Vyc2VDaGFuZ2UiLCJSZWFjdCIsIkNvbXBvbmVudCIsIkNvdXJzZVNlbGVjdG9yIiwib25DaGFuZ2UiLCJvcHRpb25zIiwia2V5cyIsIkNvdXJzZVNlbGVjdG9yT3B0aW9uIiwiZXZlbnQiLCJpbnB1dElkIiwiY2hlY2tlZCIsIk1vZHVsZXNGb3JtIiwicm93cyIsInJlZHVjZSIsInNlbWVzdGVySW5kZXgiLCJzZW1lc3Rlck51bWJlciIsInllYXJOdW1iZXIiLCJwdXNoIiwiY29uY2F0IiwibW9kdWxlSW5kZXgiLCJNb2R1bGVSb3ciLCJvbk1hcmtDaGFuZ2UiLCJNb2R1bGVNYXJrSW5wdXQiLCJlbXB0eSIsInZhbGlkIiwiaW5wdXQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRyaW0iLCJwYXJzZUludCIsIk51bWJlciIsImlzTmFOIiwiY2xhc3NlcyIsImpvaW4iLCJSZXN1bHRzIiwic2l6ZSIsInBvc3NpYmxlIiwiYWN0dWFsIiwiYXZlcmFnZSIsImNsYXNzaWZpY2F0aW9uIiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztB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LHNCQUFZNUQsT0FBWjtBQUNBNkQsb0JBQVU3RCxXQUFXaUIsT0FBTyxHQUFsQixDQUFWO0FBQ0Q7QUFYTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVlQLFVBQUk2QyxVQUFXRCxTQUFTRCxRQUFWLEdBQXNCLEdBQXBDO0FBQ0EsVUFBSUcsdUJBQUo7QUFDQSxjQUFRLElBQVI7QUFDRSxhQUFLRCxVQUFVLEVBQWY7QUFDRUMsMkJBQWlCLE1BQWpCO0FBQ0E7QUFDRixhQUFLRCxVQUFVLEVBQWY7QUFDRUMsMkJBQWlCLE1BQWpCO0FBQ0E7QUFDRixhQUFLRCxVQUFVLEVBQWY7QUFDRUMsMkJBQWlCLEtBQWpCO0FBQ0E7QUFDRixhQUFLRCxVQUFVLEVBQWY7QUFDRUMsMkJBQWlCLEtBQWpCO0FBQ0E7QUFDRjtBQUNFQSwyQkFBaUIsS0FBakI7QUFDQTtBQWZKO0FBaUJBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxTQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBUztBQUFBO0FBQUE7QUFBU0YsbUJBQU9HLE9BQVAsQ0FBZSxDQUFmO0FBQVQsV0FBVDtBQUFBO0FBQXdFO0FBQUE7QUFBQTtBQUFTSjtBQUFUO0FBQXhFLFNBRkY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUF3QztBQUFBO0FBQUE7QUFBU0Usb0JBQVFFLE9BQVIsQ0FBZ0IsQ0FBaEI7QUFBVCxXQUF4QztBQUFBO0FBQUEsU0FIRjtBQUlFO0FBQUE7QUFBQTtBQUFBO0FBQXNCO0FBQUE7QUFBQTtBQUFTRDtBQUFUO0FBQXRCO0FBSkYsT0FERjtBQVFEOzs7O0VBekNtQnRDLE1BQU1DLFMiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGV2ZW50ID0+IHtcbiAgUmVhY3RET00ucmVuZGVyKFxuICAgIDxGb3JtIGNvdXJzZXM9e2NvdXJzZXN9IG1vZHVsZXM9e21vZHVsZXN9IC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVhY3RSb290XCIpXG4gICk7XG59KTtcblxuY29uc3QgY291cnNlcyA9IHtcbiAgY29tcHNjaToge1xuICAgIGxhYmVsOiBcIkNvbXB1dGVyIFNjaWVuY2VcIixcbiAgICBzZW1lc3RlcnM6IFtcbiAgICAgIFtcIjEwMDNcIiwgXCIxMDA4XCIsIFwiMTAxMlwiLCBcIjEwMTZcIl0sXG4gICAgICBbXCIxMDAxXCIsIFwiMTAwNVwiLCBcIjEwMTlcIl0sXG4gICAgICBbXCIyMDAxXCIsIFwiMjAwNlwiLCBcIjIwMTFcIiwgXCIyMDEyXCJdLFxuICAgICAgW1wiMjAwOFwiLCBcIjIwMTVcIiwgXCIyMDE2XCIsIFwiMjAxN1wiXSxcbiAgICBdLFxuICB9LFxuICBjb21wdXRpbmc6IHtcbiAgICBsYWJlbDogXCJDb21wdXRpbmdcIixcbiAgICBzZW1lc3RlcnM6IFtcbiAgICAgIFtcIjEwMDNcIiwgXCIxMDA4XCIsIFwiMTA5N1wiLCBcIjEwOThcIl0sXG4gICAgICBbXCIxMDA1XCIsIFwiMTAxOVwiLCBcIjEwOTRcIl0sXG4gICAgICBbXCIyMDAxXCIsIFwiMjAwNlwiLCBcIjIwMTJcIiwgXCIxMDE2XCJdLFxuICAgICAgW1wiMjAwMlwiLCBcIjIwMTVcIiwgXCIyMDE2XCIsIFwiMjAxN1wiXSxcbiAgICBdLFxuICB9LFxufTtcblxuY29uc3QgbW9kdWxlcyA9IHtcbiAgXCIxMDAxXCI6IHsgdGl0bGU6IFwiTG9naWMgYW5kIFByb2JsZW0gU29sdmluZ1wiLCBjcmVkaXRzOiAyMCB9LFxuICBcIjEwMDNcIjogeyB0aXRsZTogXCJQcm9ncmFtIERlc2lnblwiLCBjcmVkaXRzOiAyMCB9LFxuICBcIjEwMDVcIjogeyB0aXRsZTogXCJEYXRhIFN0cnVjdHVyZXMgYW5kIERldmVsb3BtZW50IEVudmlyb25tZW50c1wiLCBjcmVkaXRzOiAyMCB9LFxuICBcIjEwMDhcIjogeyB0aXRsZTogXCJSZXF1aXJlbWVudHMgRW5naW5lZXJpbmcgYW5kIFByb2Zlc3Npb25hbCBQcmFjdGljZVwiLCBjcmVkaXRzOiAxMCB9LFxuICBcIjEwMTJcIjogeyB0aXRsZTogXCJEaXNjcmV0ZSBTdHJ1Y3R1cmVzXCIsIGNyZWRpdHM6IDEwIH0sXG4gIFwiMTAxNlwiOiB7IHRpdGxlOiBcIkNvbXB1dGVyIFN5c3RlbXNcIiwgY3JlZGl0czogMjAgfSxcbiAgXCIxMDE5XCI6IHsgdGl0bGU6IFwiRGF0YWJhc2VzIGFuZCBXZWIgQXBwbGljYXRpb25zXCIsIGNyZWRpdHM6IDIwIH0sXG4gIFwiMTA5NFwiOiB7IHRpdGxlOiBcIkNvbXB1dGVycyBhbmQgU29jaWV0eVwiLCBjcmVkaXRzOiAyMCB9LFxuICBcIjEwOTdcIjogeyB0aXRsZTogXCJJbnRlcm5ldCBDb21wdXRpbmdcIiwgY3JlZGl0czogMTAgfSxcbiAgXCIxMDk4XCI6IHsgdGl0bGU6IFwiSW5mb3JtYXRpb24gTWFuYWdlbWVudFwiLCBjcmVkaXRzOiAxMCB9LFxuICBcIjIwMDFcIjogeyB0aXRsZTogXCJVc2VyIEludGVyZmFjZXMgYW5kIEhDSVwiLCBjcmVkaXRzOiAxMCB9LFxuICBcIjIwMDJcIjogeyB0aXRsZTogXCJGaW5hbmNpYWwgYW5kIEJ1c2luZXNzIENvbXB1dGluZ1wiLCBjcmVkaXRzOiAxMCB9LFxuICBcIjIwMDZcIjogeyB0aXRsZTogXCJTb2Z0d2FyZSBFbmdpbmVlcmluZyBhbmQgU3lzdGVtIERldmVsb3BtZW50XCIsIGNyZWRpdHM6IDIwIH0sXG4gIFwiMjAwOFwiOiB7IHRpdGxlOiBcIkZ1bmN0aW9uYWwgUHJvZ3JhbW1pbmdcIiwgY3JlZGl0czogMTAgfSxcbiAgXCIyMDExXCI6IHsgdGl0bGU6IFwiQXV0b21hdGEsIExhbmd1YWdlcyBhbmQgQ29tcHV0YXRpb25cIiwgY3JlZGl0czogMjAgfSxcbiAgXCIyMDEyXCI6IHsgdGl0bGU6IFwiU29mdHdhcmUgUHJvamVjdCBNYW5hZ2VtZW50IGFuZCBQcm9mZXNzaW9uYWxpc21cIiwgY3JlZGl0czogMTAgfSxcbiAgXCIyMDE1XCI6IHsgdGl0bGU6IFwiU29mdHdhcmUgRW5naW5lZXJpbmcgUHJvamVjdFwiLCBjcmVkaXRzOiAyMCB9LFxuICBcIjIwMTZcIjogeyB0aXRsZTogXCJNdWx0aW1lZGlhIGFuZCBDb21wdXRlciBHcmFwaGljc1wiLCBjcmVkaXRzOiAxMCB9LFxuICBcIjIwMTdcIjogeyB0aXRsZTogXCJPcGVyYXRpbmcgU3lzdGVtcywgTmV0d29ya3MgYW5kIERpc3RyaWJ1dGVkIFN5c3RlbXNcIiwgY3JlZGl0czogMjAgfSxcbn07XG5cbmNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvdXJzZUlkOiBudWxsLFxuICAgICAgbWFya3M6IG5ldyBNYXAoKVxuICAgIH07XG4gIH1cbiAgXG4gIGdldENvdXJzZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5jb3Vyc2VJZCA9PT0gbnVsbClcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNvdXJzZXNbdGhpcy5zdGF0ZS5jb3Vyc2VJZF07XG4gIH1cbiAgXG4gIGdldENvdXJzZVNlbWVzdGVycygpIHtcbiAgICBsZXQgY291cnNlID0gdGhpcy5nZXRDb3Vyc2UoKTtcbiAgICBpZiAoY291cnNlID09PSBudWxsKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvdXJzZS5zZW1lc3RlcnMubWFwKHNlbWVzdGVyID0+IHtcbiAgICAgIHJldHVybiBzZW1lc3Rlci5tYXAobW9kdWxlSWQgPT4ge1xuICAgICAgICBsZXQgbW9kdWxlID0gdGhpcy5wcm9wcy5tb2R1bGVzW21vZHVsZUlkXTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBpZDogbW9kdWxlSWQgfSwgbW9kdWxlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIFxuICBvbkNvdXJzZUNoYW5nZShjb3Vyc2VJZCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjb3Vyc2VJZCB9KTtcbiAgfVxuICBcbiAgb25Nb2R1bGVNYXJrQ2hhbmdlKG1vZHVsZUlkLCBtYXJrKSB7XG4gICAgbGV0IG1hcmtzID0gdGhpcy5zdGF0ZS5tYXJrcztcbiAgICBpZiAobWFyayA9PT0gbnVsbCkge1xuICAgICAgbWFya3MuZGVsZXRlKG1vZHVsZUlkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBtYXJrcy5zZXQobW9kdWxlSWQsIG1hcmspO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgbWFya3MgfSk7XG4gIH1cbiAgXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudDtcbiAgICBpZiAodGhpcy5zdGF0ZS5jb3Vyc2VJZCA9PT0gbnVsbCkge1xuICAgICAgY29udGVudCA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnN0cnVjdGlvbnNcIj5cbiAgICAgICAgICA8cD5TZWxlY3QgYSBjb3Vyc2UuIFlvdXIgcmVzdWx0cyB3aWxsIGJlIHNob3duIGF0IHRoZSBib3R0b20gb2YgdGhlIHBhZ2Ugb25jZSB5b3UgaGF2ZSBmaWxsZWQgaW4geW91ciBtYXJrcy48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb250ZW50ID0gKFxuICAgICAgICA8TW9kdWxlc0Zvcm1cbiAgICAgICAgICBzZW1lc3RlcnM9e3RoaXMuZ2V0Q291cnNlU2VtZXN0ZXJzKCl9XG4gICAgICAgICAgb25Nb2R1bGVNYXJrQ2hhbmdlPXt0aGlzLm9uTW9kdWxlTWFya0NoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxDb3Vyc2VTZWxlY3RvclxuICAgICAgICAgIGNvdXJzZXM9e3RoaXMucHJvcHMuY291cnNlc31cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNvdXJzZUNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAvPlxuICAgICAgICB7Y29udGVudH1cbiAgICAgICAgPFJlc3VsdHNcbiAgICAgICAgICBtYXJrcz17dGhpcy5zdGF0ZS5tYXJrc31cbiAgICAgICAgICBtb2R1bGVzPXt0aGlzLnByb3BzLm1vZHVsZXN9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4gIFxufVxuXG5jbGFzcyBDb3Vyc2VTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY291cnNlSWQ6IG51bGxcbiAgICB9O1xuICB9XG4gIFxuICBvbkNoYW5nZShjb3Vyc2VJZCkge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY291cnNlSWQpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjb3Vyc2VJZCB9KTtcbiAgfVxuICBcbiAgcmVuZGVyKCkge1xuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5jb3Vyc2VzKS5tYXAoY291cnNlSWQgPT4ge1xuICAgICAgbGV0IGNvdXJzZSA9IHRoaXMucHJvcHMuY291cnNlc1tjb3Vyc2VJZF07XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IGlkOiBjb3Vyc2VJZCB9LCBjb3Vyc2UpO1xuICAgIH0pXG4gICAgLm1hcChjb3Vyc2UgPT4gKFxuICAgICAgPENvdXJzZVNlbGVjdG9yT3B0aW9uXG4gICAgICAgIGtleT17Y291cnNlLmlkfVxuICAgICAgICBjb3Vyc2U9e2NvdXJzZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgY2hlY2tlZD17Y291cnNlLmlkID09PSB0aGlzLnN0YXRlLmNvdXJzZUlkfVxuICAgICAgLz5cbiAgICApKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb3Vyc2UtZm9ybS13cmFwcGVyXCI+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImNvdXJzZS1mb3JtXCI+e29wdGlvbnN9PC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICBcbn1cblxuY2xhc3MgQ291cnNlU2VsZWN0b3JPcHRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBcbiAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMuY291cnNlLmlkKTtcbiAgfVxuICBcbiAgcmVuZGVyKCkge1xuICAgIGxldCBpbnB1dElkID0gYGNvdXJzZVNlbGVjdG9yLSR7dGhpcy5wcm9wcy5jb3Vyc2UuaWR9YFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvdXJzZS1vcHRpb25cIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgaWQ9e2lucHV0SWR9XG4gICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICBuYW1lPVwiY291cnNlXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jb3Vyc2UuaWR9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9XG4gICAgICAgIC8+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPXtpbnB1dElkfT57dGhpcy5wcm9wcy5jb3Vyc2UubGFiZWx9PC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbiAgXG59XG5cbmNsYXNzIE1vZHVsZXNGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcm93cyA9IHRoaXMucHJvcHMuc2VtZXN0ZXJzLnJlZHVjZSgocm93cywgc2VtZXN0ZXIsIHNlbWVzdGVySW5kZXgpID0+IHtcbiAgICAgIGxldCBzZW1lc3Rlck51bWJlciA9IChzZW1lc3RlckluZGV4ICYgMSkgKyAxO1xuICAgICAgbGV0IHllYXJOdW1iZXIgPSAoc2VtZXN0ZXJJbmRleCA+PiAxKSArIDE7XG4gICAgICByb3dzLnB1c2goXG4gICAgICAgIDx0ciBjbGFzc05hbWU9XCJkaXZpZGVyLXJvd1wiIGtleT17YHkke3llYXJOdW1iZXJ9cyR7c2VtZXN0ZXJOdW1iZXJ9YH0+XG4gICAgICAgICAgPHRoIGNvbFNwYW49XCI0XCI+XG4gICAgICAgICAgICB7YFllYXIgJHt5ZWFyTnVtYmVyfSwgU2VtZXN0ZXIgJHtzZW1lc3Rlck51bWJlcn1gfVxuICAgICAgICAgIDwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICApO1xuICAgICAgcmV0dXJuIHJvd3MuY29uY2F0KHNlbWVzdGVyLm1hcCgobW9kdWxlLCBtb2R1bGVJbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxNb2R1bGVSb3dcbiAgICAgICAgICAgIGtleT17bW9kdWxlLmlkfVxuICAgICAgICAgICAgbW9kdWxlPXttb2R1bGV9XG4gICAgICAgICAgICBvbk1hcmtDaGFuZ2U9e3RoaXMucHJvcHMub25Nb2R1bGVNYXJrQ2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9XCJtb2R1bGUtZm9ybVwiPlxuICAgICAgICA8dGFibGU+XG4gICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImhlYWRlci1yb3dcIj5cbiAgICAgICAgICAgICAgPHRoPkNvZGU8L3RoPlxuICAgICAgICAgICAgICA8dGg+VGl0bGU8L3RoPlxuICAgICAgICAgICAgICA8dGg+Q3JlZGl0czwvdGg+XG4gICAgICAgICAgICAgIDx0aD5Zb3VyIG1hcms8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L2Zvcm0+XG4gICAgKTtcbiAgfVxuICBcbn1cblxuY2xhc3MgTW9kdWxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtYXJrOiBudWxsXG4gICAgfTtcbiAgfVxuICBcbiAgb25NYXJrQ2hhbmdlKG1hcmspIHtcbiAgICB0aGlzLnByb3BzLm9uTWFya0NoYW5nZSh0aGlzLnByb3BzLm1vZHVsZS5pZCwgbWFyayk7XG4gIH1cbiAgXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHRyIGNsYXNzTmFtZT1cIm1vZHVsZS1yb3dcIj5cbiAgICAgICAgPHRkPntcIkNPXCIgKyB0aGlzLnByb3BzLm1vZHVsZS5pZH08L3RkPlxuICAgICAgICA8dGQ+e3RoaXMucHJvcHMubW9kdWxlLnRpdGxlfTwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJhbGlnbi1yaWdodFwiPnt0aGlzLnByb3BzLm1vZHVsZS5jcmVkaXRzfTwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJhbGlnbi1yaWdodFwiPlxuICAgICAgICAgIDxNb2R1bGVNYXJrSW5wdXRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uTWFya0NoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgICk7XG4gIH1cbiAgXG59XG5cbmNsYXNzIE1vZHVsZU1hcmtJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZW1wdHk6IHRydWUsXG4gICAgICB2YWxpZDogZmFsc2UsXG4gICAgfTtcbiAgfVxuICBcbiAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICBsZXQgaW5wdXQgPSBldmVudC50YXJnZXQudmFsdWUudHJpbSgpO1xuICAgIGxldCBlbXB0eSA9IChpbnB1dCA9PT0gXCJcIik7XG4gICAgbGV0IHZhbGlkID0gZmFsc2U7XG4gICAgaWYgKGVtcHR5KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZW1wdHksIHZhbGlkIH0pO1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsZXQgdmFsdWUgPSBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgbGV0IHZhbGlkID0gIShOdW1iZXIuaXNOYU4odmFsdWUpIHx8IHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZW1wdHksIHZhbGlkIH0pO1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh2YWxpZCA/IHZhbHVlIDogbnVsbCk7XG4gICAgfVxuICB9XG4gIFxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNsYXNzZXMgPSBbXCJtYXJrLWlucHV0XCJdO1xuICAgIGlmICghdGhpcy5zdGF0ZS5lbXB0eSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMuc3RhdGUudmFsaWQgPyBcInZhbGlkXCIgOiBcImludmFsaWRcIik7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgIG1pbj1cIjBcIlxuICAgICAgICBtYXg9XCIxMDBcIlxuICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5qb2luKFwiIFwiKX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuICBcbn1cblxuY2xhc3MgUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICByZW5kZXIoKSB7XG4gICAgbGV0IG1hcmtzID0gdGhpcy5wcm9wcy5tYXJrcztcbiAgICBpZiAobWFya3Muc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCBwb3NzaWJsZSA9IDA7XG4gICAgbGV0IGFjdHVhbCA9IDA7XG4gICAgZm9yIChsZXQgW21vZHVsZUlkLCBtYXJrXSBvZiBtYXJrcykge1xuICAgICAgbGV0IGNyZWRpdHMgPSB0aGlzLnByb3BzLm1vZHVsZXNbbW9kdWxlSWRdLmNyZWRpdHM7XG4gICAgICBwb3NzaWJsZSArPSBjcmVkaXRzO1xuICAgICAgYWN0dWFsICs9IGNyZWRpdHMgKiAobWFyayAvIDEwMCk7XG4gICAgfVxuICAgIGxldCBhdmVyYWdlID0gKGFjdHVhbCAvIHBvc3NpYmxlKSAqIDEwMDtcbiAgICBsZXQgY2xhc3NpZmljYXRpb247XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGF2ZXJhZ2UgPCA0MDpcbiAgICAgICAgY2xhc3NpZmljYXRpb24gPSBcImZhaWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGF2ZXJhZ2UgPCA1MDpcbiAgICAgICAgY2xhc3NpZmljYXRpb24gPSBcInBhc3NcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGF2ZXJhZ2UgPCA2MDpcbiAgICAgICAgY2xhc3NpZmljYXRpb24gPSBcIjI6MlwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgYXZlcmFnZSA8IDcwOlxuICAgICAgICBjbGFzc2lmaWNhdGlvbiA9IFwiMjoxXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY2xhc3NpZmljYXRpb24gPSBcIjFzdFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0c1wiPlxuICAgICAgICA8aDI+WW91ciBSZXN1bHRzPC9oMj5cbiAgICAgICAgPHA+VG90YWwgPG91dHB1dD57YWN0dWFsLnRvRml4ZWQoMSl9PC9vdXRwdXQ+IGNyZWRpdHMgb3V0IG9mIGEgcG9zc2libGUgPG91dHB1dD57cG9zc2libGV9PC9vdXRwdXQ+PC9wPlxuICAgICAgICA8cD5Zb3VyIHdlaWdodGVkIGF2ZXJhZ2UgbW9kdWxlIG1hcmsgaXMgPG91dHB1dD57YXZlcmFnZS50b0ZpeGVkKDEpfTwvb3V0cHV0PiU8L3A+XG4gICAgICAgIDxwPlRoYXQgcHV0cyB5b3Ugb24gYSA8b3V0cHV0PntjbGFzc2lmaWNhdGlvbn08L291dHB1dD48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4gIFxufSJdfQ==