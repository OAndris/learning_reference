import logging

from script import func

def test_func(caplog):
    caplog.set_level(logging.INFO)
    func()
    record1, record2 = caplog.records
    assert record1.levelname == "INFO"  # not "debug", because logging.INFO is set
    assert record1.message == "An info message"
    assert record2.levelname == "ERROR"
    assert record2.message == "Cannot divide by 0"
    assert record2.exc_info[0] is ZeroDivisionError
