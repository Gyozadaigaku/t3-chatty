import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { useState } from "react";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [formContent, setFormContent] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [editedField, setEditedField] = useState("");
  const [textField, setTextField] = useState("");

  const addQuestion = () => {
    const field = {
      name: `question_${formContent.length}`,
      label: "Untitled question",
      question_type: "short_answer",
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
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>

          <div className="container mx-auto h-screen px-4">
            <div className="my-4 flex w-full flex-col space-y-2">
              <h1 className="text-2xl font-bold">Form Maker</h1>
              <h2 className="text-lg">Untitled Form</h2>
            </div>
            <div className="my-10 rounded-md bg-white p-5 shadow-lg">
              {formContent.map((field) => {
                return (
                  <div key={field.name}>
                    <div className="flex items-center justify-between space-y-2">
                      <div className="block text-sm font-medium capitalize text-gray-700">
                        {onEdit && editedField === field.name ? (
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) =>
                              editField(field.name, e.target.value)
                            }
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

                    <div className="my-4">
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
                              onClick={() =>
                                addFieldOption(field.name, textField)
                              }
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="relative w-full p-5">
                <div className="absolute inset-x-0 bottom-0 flex h-12 justify-center">
                  <button
                    onClick={() => addQuestion()}
                    className="inline-flex items-center rounded-md bg-gray-800 p-3 text-sm text-white hover:bg-gray-700"
                  >
                    Add Question
                  </button>
                </div>
              </div>
            </div>
            <div className="my-4 flex w-full flex-col space-y-2">
              <h1 className="text-2xl font-bold">Form Maker Preview</h1>
              <h2 className="text-lg">Untitled Form</h2>
            </div>
            <div className="my-10 rounded-md bg-white p-5 shadow-lg">
              {formContent.map((field) => {
                return (
                  <div>
                    <div className="flex items-center justify-between space-y-2">
                      <div
                        key={field.name}
                        className="block text-sm font-medium capitalize text-gray-700"
                      >
                        <label onClick={() => setOnEdit(true)}>
                          {field.label}
                        </label>
                      </div>
                    </div>

                    <div className="my-4">
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
                        <select className="block h-10 w-full rounded-md px-5 shadow-sm">
                          {field.list.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
