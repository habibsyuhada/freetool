import { useState, useEffect } from 'react';
import { Box, Title, TextInput, Button, Group, Divider } from '@mantine/core';

type Variable = {
  name: string;
  value: string;
};

type VariableEditorProps = {
  variables: Variable[];
  initialValues?: Record<string, string>;
  onSave: (values: Record<string, string>) => void;
  onCancel: () => void;
};

const VariableEditor = ({ variables, initialValues = {}, onSave, onCancel }: VariableEditorProps) => {
  // Initialize values with either initialValues or default values from variables
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initialState: Record<string, string> = {};
    variables.forEach(variable => {
      // Prioritaskan nilai dari initialValues, jika tidak ada gunakan nilai default dari variable
      initialState[variable.name] = initialValues[variable.name] !== undefined 
        ? initialValues[variable.name] 
        : (variable.value || '');
    });
    return initialState;
  });

  useEffect(() => {
    // Update values when initialValues or variables change
    const newValues: Record<string, string> = {};
    variables.forEach(variable => {
      newValues[variable.name] = initialValues[variable.name] !== undefined 
        ? initialValues[variable.name] 
        : (variable.value || '');
    });
    setValues(newValues);
  }, [initialValues, variables]);

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value || ''
    }));
  };

  const handleSave = () => {
    // Ensure all variables have values before saving
    const finalValues = { ...values };
    variables.forEach(variable => {
      if (finalValues[variable.name] === undefined) {
        finalValues[variable.name] = variable.value || '';
      }
    });
    onSave(finalValues);
  };

  const getDisplayName = (name: string): string => {
    if (name.startsWith('margin_')) {
      return name.replace('margin_', '').split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return name.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const marginVariables = variables.filter(v => v.name.startsWith('margin_'));
  const otherVariables = variables.filter(v => !v.name.startsWith('margin_'));

  return (
    <Box p="md">
      {marginVariables.length > 0 && (
        <>
          <Title order={4} mb="sm">Page Margins (mm)</Title>
          <Group grow mb="md">
            {marginVariables.map((variable) => (
              <TextInput
                key={variable.name}
                label={getDisplayName(variable.name)}
                value={values[variable.name] || ''}
                onChange={(e) => handleChange(variable.name, e.target.value)}
                type="number"
                min="0"
                max="100"
              />
            ))}
          </Group>
        </>
      )}

      {otherVariables.length > 0 && (
        <>
          {marginVariables.length > 0 && <Divider my="md" />}
          <Title order={4} mb="sm">Document Variables</Title>
          {otherVariables.map((variable) => (
            <TextInput
              key={variable.name}
              label={getDisplayName(variable.name)}
              value={values[variable.name] || ''}
              onChange={(e) => handleChange(variable.name, e.target.value)}
              mb="sm"
            />
          ))}
        </>
      )}

      <Group mt="xl" style={{ justifyContent: 'flex-end' }}>
        <Button onClick={handleSave} color="blue">Apply Changes</Button>
        <Button onClick={onCancel} variant="outline">Cancel</Button>
      </Group>
    </Box>
  );
};

export default VariableEditor; 