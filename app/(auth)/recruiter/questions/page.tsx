'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, Copy } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  is_predefined: boolean;
  created_at: string;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Question>>({});
  const [newQuestion, setNewQuestion] = useState({
    question_text: '',
    question_type: 'text',
    options: [''],
    is_predefined: false
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async () => {
    if (!newQuestion.question_text.trim()) {
      alert('Please enter question text');
      return;
    }

    try {
      const { error } = await supabase
        .from('questions')
        .insert([{
          question_text: newQuestion.question_text,
          question_type: newQuestion.question_type,
          options: newQuestion.question_type === 'dropdown' ? 
            newQuestion.options.filter(o => o.trim()) : [],
          is_predefined: newQuestion.is_predefined
        }]);

      if (error) throw error;

      setNewQuestion({
        question_text: '',
        question_type: 'text',
        options: [''],
        is_predefined: false
      });
      
      fetchQuestions();
      alert('Question added successfully!');
    } catch (error: any) {
      console.error('Error adding question:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleUpdateQuestion = async (id: string) => {
    try {
      const { error } = await supabase
        .from('questions')
        .update(editForm)
        .eq('id', id);

      if (error) throw error;

      setEditingId(null);
      setEditForm({});
      fetchQuestions();
      alert('Question updated successfully!');
    } catch (error: any) {
      console.error('Error updating question:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchQuestions();
      alert('Question deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting question:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const addOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const removeOption = (index: number) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Questions</h1>
          <p className="text-gray-600 mt-2">Manage questions for job applications</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Add New Question Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Question</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text *
              </label>
              <input
                type="text"
                value={newQuestion.question_text}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, question_text: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your question"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Type
              </label>
              <select
                value={newQuestion.question_type}
                onChange={(e) => setNewQuestion(prev => ({ 
                  ...prev, 
                  question_type: e.target.value,
                  options: e.target.value === 'dropdown' ? [''] : []
                }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="text">Text Input</option>
                <option value="textarea">Text Area</option>
                <option value="dropdown">Dropdown</option>
              </select>
            </div>

            {newQuestion.question_type === 'dropdown' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options *
                </label>
                <div className="space-y-2">
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Option ${index + 1}`}
                      />
                      {newQuestion.options.length > 1 && (
                        <button
                          onClick={() => removeOption(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addOption}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Option
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_predefined"
                checked={newQuestion.is_predefined}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, is_predefined: e.target.checked }))}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="is_predefined" className="ml-2 text-sm text-gray-600">
                Save as predefined question (available for all jobs)
              </label>
            </div>

            <button
              onClick={handleAddQuestion}
              disabled={!newQuestion.question_text.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Add Question
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">All Questions</h2>
            
            <div className="space-y-4">
              {questions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No questions yet. Add your first question!
                </div>
              ) : (
                questions.map(question => (
                  <div key={question.id} className="border rounded-lg p-4">
                    {editingId === question.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.question_text || question.question_text}
                          onChange={(e) => setEditForm(prev => ({ ...prev, question_text: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuestion(question.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setEditForm({});
                              }}
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900">{question.question_text}</h3>
                              {question.is_predefined && (
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                                  Predefined
                                </span>
                              )}
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                {question.question_type}
                              </span>
                            </div>
                            {question.options.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">Options:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {question.options.map((opt, i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
                                      {opt}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              Created: {new Date(question.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingId(question.id);
                                setEditForm(question);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Predefined Questions Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">About Predefined Questions</h3>
            <p className="text-sm text-blue-700">
              Predefined questions are available for quick selection when creating new jobs.
              They help maintain consistency across job applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}