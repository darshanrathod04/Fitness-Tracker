import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '../../theme/colors';
import { Radii } from '../../theme/radii';
import { Spacing } from '../../theme/spacing';
import { Typography } from '../../theme/typography';
import { Layout } from '../../theme/layout';

interface FormFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  hint?: string;
  secure?: boolean;
}

export default function FormField({
  label,
  icon,
  error,
  hint,
  secure,
  ...inputProps
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!secure);

  const hasError = !!error;

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.field,
          focused && styles.fieldFocused,
          hasError && styles.fieldError,
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={20}
            color={hasError ? Palette.danger : focused ? Palette.primary : Palette.textMuted}
          />
        ) : null}

        <TextInput
          {...inputProps}
          style={styles.input}
          placeholderTextColor={Palette.textMuted}
          secureTextEntry={hidden}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps.onBlur?.(e);
          }}
        />

        {secure ? (
          <TouchableOpacity onPress={() => setHidden((h) => !h)} hitSlop={10}>
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={Palette.textMuted}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {hasError ? (
        <Text style={styles.error}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: Spacing.lg, width: '100%' },
  label: {
    ...Typography.label,
    color: Palette.textSecondary,
    marginBottom: Spacing.sm,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Layout.inputHeight,
    backgroundColor: Palette.surfaceHigh,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  fieldFocused: {
    borderColor: Palette.primary,
    backgroundColor: Palette.surfaceRaised,
  },
  fieldError: {
    borderColor: Palette.danger,
  },
  input: {
    flex: 1,
    color: Palette.text,
    fontSize: 15,
    height: '100%',
  },
  error: {
    ...Typography.small,
    color: Palette.danger,
    marginTop: Spacing.xs,
  },
  hint: {
    ...Typography.small,
    color: Palette.textMuted,
    marginTop: Spacing.xs,
  },
});

export type { FormFieldProps };