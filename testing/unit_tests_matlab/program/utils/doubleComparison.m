function [ isSame ] = doubleComparison( num1, num2, maxDifference)
% Compare two double values.
%
% SYNTAX
%   [ isSame ] = doubleComparison( num1, num2, maxDifference)
% 
% INPUTS
%   num1:   double value
%   num2:   double value
%   maxDifference: max allowed difference between the num1 and num2
%
% OUTPUTS
%   isSame = return value is true, if difference between the num1 and num2 is less than the given maxDifference,
%            or equals to maxDifference
%            otherwise the return value is false
%
% EXAMPLE
%  [ isSame ] = doubleComparison( 0.000001, 0.000002, 0.00000001) 
%

difference = abs(num1 - num2);

if (difference <= maxDifference )
    isSame = true;
else
    isSame = false;
end
end
