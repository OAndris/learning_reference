# Based on: https://www.linkedin.com/learning/advanced-python/iterators

days_en = ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
days_ger = ('Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag')

max_length = len(max(days_en, key=len))
for i, m in enumerate(zip(days_en, days_ger), start=1):
    print(f'{i}: {m[0]:<{max_length}} --> "{m[1]}" in German.')
