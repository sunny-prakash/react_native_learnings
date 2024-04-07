/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {styled} from 'nativewind';
import {Formik} from 'formik';
import {vh} from 'react-native-expo-viewport-units';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup';
// import Clipboard from '@react-native-clipboard/clipboard';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});

const StyledSafeArea = styled(SafeAreaView);

const App = () => {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setupperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const backgroundStyle = 'bg-neutral-300 dark:bg-slate-900';

  const generatePassword = (passLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };
  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setupperCase(false);
    setNumbers(false);
    setSymbols(false);
    setCopied(false);
  };
  const copyText = () => {
    // Clipboard.setString(password);
    setCopied(true);
  };

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <StyledSafeArea className={backgroundStyle}>
          <View style={styles.mainComtainer}>
            <Text style={styles.pageHeading}>Password Generator</Text>
            <View>
              <Formik
                initialValues={{passwordLength: ''}}
                validateOnChange
                validationSchema={PasswordSchema}
                onSubmit={(values: {passwordLength: string | number}) => {
                  generatePassword(+values.passwordLength);
                }}>
                {({
                  values,
                  errors,
                  touched,
                  isValid,
                  handleChange,
                  handleSubmit,
                  handleReset,
                  /* and other goodies */
                }) => (
                  <>
                    <View style={styles.formContainer}>
                      <View style={styles.inputFieldWrapper}>
                        <Text style={styles.fieldLabel}> Password Length</Text>
                        {touched && errors?.passwordLength && (
                          <Text className="text-red-900">
                            {errors.passwordLength}
                          </Text>
                        )}
                        <TextInput
                          value={values.passwordLength}
                          style={styles.inputField}
                          placeholder="Enter a number"
                          keyboardType="numeric"
                          onChangeText={handleChange('passwordLength')}
                        />
                      </View>
                      <View style={{marginTop: 30}}>
                        <View style={styles.enableWrapper}>
                          <Text style={styles.checkBoxLabel}>
                            Use Lower Case Letters
                          </Text>
                          <BouncyCheckbox
                            disableBuiltInState
                            size={25}
                            isChecked={lowerCase}
                            fillColor="#8644A2"
                            unfillColor="#FFFFFF"
                            onPress={() => setLowerCase(!lowerCase)}
                          />
                        </View>
                        <View style={styles.enableWrapper}>
                          <Text style={styles.checkBoxLabel}>
                            Use Upper Case Letters
                          </Text>
                          <BouncyCheckbox
                            disableBuiltInState
                            isChecked={upperCase}
                            size={25}
                            fillColor="#789461"
                            unfillColor="#FFFFFF"
                            onPress={() => setupperCase(!upperCase)}
                          />
                        </View>
                        <View style={styles.enableWrapper}>
                          <Text style={styles.checkBoxLabel}>Use Numbers</Text>
                          <BouncyCheckbox
                            disableBuiltInState
                            isChecked={numbers}
                            size={25}
                            fillColor="#FF8F8F"
                            unfillColor="#FFFFFF"
                            onPress={() => setNumbers(!numbers)}
                          />
                        </View>
                        <View style={styles.enableWrapper}>
                          <Text style={styles.checkBoxLabel}>
                            Use Special Characters
                          </Text>
                          <BouncyCheckbox
                            disableBuiltInState
                            isChecked={symbols}
                            size={25}
                            fillColor="#994D1C"
                            unfillColor="#FFFFFF"
                            onPress={() => setSymbols(!symbols)}
                          />
                        </View>
                      </View>
                      <View style={{marginTop: 30}}>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                            disabled={!isValid}
                            style={styles.primaryBtn}
                            onPress={() => handleSubmit()}>
                            <Text style={styles.primaryBtnTxt}>Generate</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.secondaryBtn}
                            onPress={() => {
                              handleReset();
                              resetPassword();
                            }}>
                            <Text style={styles.secondaryBtnTxt}>Reset</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </>
                )}
              </Formik>
            </View>
            {isPassGenerated && (
              <View className="w-100 bg-sky-600 mt-10 flex p-3 rounded-xl">
                <View>
                  <Text className="text-xl text-center">
                    Generated Password:
                  </Text>
                  <Text className="text-l text-center mt-3 flex-wrap">
                    {password}
                  </Text>
                  <TouchableOpacity
                    onPress={() => copyText()}
                    disabled={copied}
                    className="bg-slate-400 w-14 text-center p-1 rounded-md self-center mt-10">
                    <Text className="text-center">
                      {copied ? '!Copied' : 'Copy'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </StyledSafeArea>
      </ScrollView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  mainComtainer: {
    height: vh(100),
    padding: 10,
    flex: 1,
  },
  formContainer: {
    paddingVertical: 8,
  },
  pageHeading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputFieldWrapper: {
    marginVertical: 5,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  checkBoxLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 4,
  },
  enableWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
});
