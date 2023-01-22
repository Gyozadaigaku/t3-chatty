import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
const Form = () => {
  const [formContent, setFormContent] = useState([
    {
      id: 0,
      name: "0",
      label: "Untitled Question",
      required: false,
      question_type: "short_answer",
      list: [],
    },
  ]);
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState("");
  const [editedField, setEditedField] = useState("");

  const addQuestion = () => {
    const field = {
      name: `question_${formContent.length}`,
      label: "Untitled question",
      required: false,
      question_type: "short_answer", // "paragraph", "multichoice",
      list: [],
    };
    setFormContent([...formContent, field]);
  };

  const editField = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].label = fieldLabel;
      setFormContent(formFields);
    }
  };

  const editFieldType = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].question_type = fieldLabel;
      setFormContent(formFields);
    }
  };

  const addFieldOption = (fieldName, option) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      if (option && option != "") {
        formFields[fieldIndex].list.push(option);
        setFormContent(formFields);
        setTextField("");
      }
    }
  };
  return (
    <div className="flex h-screen w-4/5 flex-col items-center justify-start space-y-4 px-4">
      <div className="item-start flex h-24 w-full flex-col justify-center space-y-2 rounded-md border-t-8 border-indigo-800 bg-white px-4 shadow-sm">
        <h1 className="text-3xl font-semibold">Form Header</h1>
        <p className="capitalize text-gray-500/80">Form Description</p>
      </div>

      <div className="relative flex w-full flex-col space-y-4">
        {formContent.map((field) => {
          return (
            <div
              key={field.id}
              className="flex w-full rounded-md bg-white px-4 shadow-md"
            >
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between space-y-2">
                  <div
                    key={field.name}
                    className="block text-sm font-medium capitalize text-gray-700"
                  >
                    {onEdit && editedField === field.name ? (
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => editField(field.name, e.target.value)}
                        onBlur={() => {
                          setOnEdit(false);
                          setEditedField("");
                        }}
                      />
                    ) : (
                      <label
                        onClick={() => {
                          setOnEdit(true);
                          setEditedField(field.name);
                        }}
                      >
                        {field.label}
                      </label>
                    )}
                  </div>
                  <div>
                    <select
                      onChange={(e) =>
                        editFieldType(field.name, e.target.value)
                      }
                    >
                      <option value="short_answer">Short Answer</option>
                      <option value="paragraph">Paragraph</option>
                      <option value="multichoice">Multichoice</option>
                    </select>
                  </div>
                </div>

                <div className="my-4 w-full">
                  {field.question_type == "short_answer" && (
                    <input
                      type="text"
                      className="block h-10 w-full rounded-md px-5 shadow-sm"
                      placeholder={field.label}
                    />
                  )}
                  {field.question_type == "paragraph" && (
                    <textarea
                      rows={4}
                      className="block h-10 w-full rounded-md px-5 shadow-sm"
                      placeholder={field.label}
                    />
                  )}
                  {field.question_type == "multichoice" && (
                    <div className="my-4 flex flex-col space-y-2">
                      <select className="block h-10 w-full rounded-md px-5 shadow-sm">
                        {field.list.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="space-between flex">
                        <input
                          type="text"
                          onChange={(e) => setTextField(e.target.value)}
                          value={textField}
                          placeholder="Add an option"
                          className="flex-1"
                        />
                        <button
                          className="block bg-indigo-700 px-4 text-white hover:bg-indigo-900"
                          onClick={() => addFieldOption(field.name, textField)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className="absolute top-0 -right-16 flex flex-col items-center rounded-md bg-white p-2 shadow-md">
          <button onClick={() => addQuestion()}>
            <PlusCircleIcon className="h-8 w-8 text-gray-400 hover:text-indigo-500" />
          </button>
          <button onClick={() => addQuestion()}>
            <PlusCircleIcon className="h-8 w-8 text-gray-400 hover:text-indigo-500" />
          </button>
          <button onClick={() => addQuestion()}>
            <PlusCircleIcon className="h-8 w-8 text-gray-400 hover:text-indigo-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
