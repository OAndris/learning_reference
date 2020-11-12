function [result1, result2] = runAllTests()
testCase1 = TestDemo;   % Instantiate the test class (creates a TestDemo object)
result1 = run(testCase1);   % Run all the tests defined within the TestDemo class
result2 = run(testCase1, 'testPositiveNumbers');  % Run a particular test from the TestDemo class
end
