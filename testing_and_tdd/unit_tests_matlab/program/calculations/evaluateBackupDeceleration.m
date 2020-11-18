function [functionResult] = evaluateBackupDeceleration(dec_critical, calculated_dec_critical)
% Deceleration limits:
toleranceValue = 0.1; % m/s2
dec_critical_upper_limit = dec_critical + toleranceValue;
dec_critical_lower_limit = dec_critical - toleranceValue;

if dec_critical_upper_limit <= calculated_dec_critical
    functionResult = 'green';
elseif dec_critical_lower_limit <= calculated_dec_critical && calculated_dec_critical < dec_critical_upper_limit
    functionResult = 'yellow';
elseif calculated_dec_critical < dec_critical_lower_limit
    functionResult = 'red';
end
end
