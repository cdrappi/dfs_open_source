""" Hello! We are excited to release an optimizer for
DK Golf contests that you can use on your own computer.
Functionally, the goal of this is to be fast and accurate.
More broadly, we want to help you understand a little bit
about how code ("scripts") and optimizers work.

When reading this file, you will see some text after a
triple quote (like above) or after a '#' character.
These both designate "comments" in Python, which is a
way to explain your code in the file. You should read these,
as we'll be explaining many of the steps

"""

import itertools
import functools
import operator

NAME_KEY = 'dk_name_id'


def prod(iterable):
    """  Multiply the arguments together
    :param iterable: an iterable of numbers
    :return: the product of the numbers in the iterable

    This is a Python function declaration. We'll see more of these
    in the rest of the code. Specifically, we will use this function
    to multiply lists of numbers together, which will be useful for
    setting exposure levels to groups of players.

    This function is pretty tiny (only 1 line!)
    Most functions will be 5-20 lines.

    """
    return functools.reduce(operator.mul, iterable, 1)


class DKGolfOptimizer:
    """ Golf lineup optimizer for use on DraftKings """

    def __init__(self, source_path):
        """

        :param source_path:
        """


def max_usage_per_combo(combo, max_by_name):
    combo_list = list(combo)
    max_values = [max_by_name[c] for c in combo_list]
    return prod(max_values)


def get_quantity_to_optimize(player_dict):
    return player_dict['projection']


def lineup_rank(combo):
    return sum(get_quantity_to_optimize(p) for p in combo)


def get_all_lineups(all_players, players_in_lineup, max_salary, min_salary, min_value):
    lineups = list()
    for combo in itertools.combinations(all_players, players_in_lineup):
        salary = sum(p['salary'] for p in combo)
        value = sum(p['value'] for p in combo)
        if salary > max_salary:
            continue
        elif salary < min_salary:
            continue
        elif value < min_value:
            continue
        else:
            lineups.append(combo)
    return sorted(lineups, key=lambda l: lineup_rank(l), reverse=True)


def generate_lineup_subsets(lineup, players_in_lineup):
    for subset_size in range(1, players_in_lineup + 1):
        for subset in itertools.combinations(lineup, subset_size):
            yield tuple(p[NAME_KEY] for p in subset), subset_size


def diversify(lineups, max_by_name, players_in_lineup):
    final_lineups = list()
    usage = dict()
    for lineup in lineups:
        if len(final_lineups) >= max_lineups:
            break
        add = True
        for subset, subset_size in list(generate_lineup_subsets(lineup, players_in_lineup)):
            # print(subset, max_usage_per_combo(subset))
            if subset in usage and (max_lineups * max_usage_per_combo(subset, max_by_name) <= usage[subset]):
                add = False
                break
        if add:
            to_append = {str(i + 1): p[NAME_KEY] for i, p in enumerate(lineup)}
            to_append.update({
                'salary': sum(p['salary'] for p in lineup),
                'projection': round(sum(p['projection'] for p in lineup), 2),
                'probability_top_10': round(math.exp(sum(math.log(p['probability_top_10']) for p in lineup)), 9),
                'probability_top_30': round(math.exp(sum(math.log(p['probability_top_30']) for p in lineup)), 9),
                'probability_make_cut': round(math.exp(sum(math.log(p['probability_make_cut']) for p in lineup)), 4),
                'log_usage': 0,  # sum(math.log(p['predicted_ownership']) for p in lineup)
            })
            final_lineups.append(to_append)

            for subset, subset_size in generate_lineup_subsets(lineup, players_in_lineup):
                if subset not in usage:
                    usage[subset] = 0
                usage[subset] += 1
            print(len(final_lineups))
    return final_lineups


if __name__ == '__main__':
    data, header = helpers.load_csv(
        '../customers/{0}-{1}-draftkings'.format(configs.TOURNAMENT_ID, configs.PROJECTION_VERSION))

    data = filter(lambda d: d['salary'], data)
    # data = filter(lambda d: d['max'],    data)

    # data = filter(lambda d: d['probability_top_20'] > 0.10, data)
    # data = filter(lambda d: d['probability_win'] > 0.006, data)
    # data = filter(lambda d: d['value'] > 2 or d['probability_win'] > 0.02, data)
    data = list(data)

    # name_to_max = {d[NAME_KEY]: d['max']/100.0 for d in data}
    name_to_max = {d[NAME_KEY]: 100.0 / 100.0 for d in data}
    # name_to_max = {d[NAME_KEY]: d['probability_top_20'] for d in data}

    max_lineups = 100

    min_salary = 49900
    max_salary = 50000

    min_value = 0
    lineup_size = 6

    print(len(data))

    lineups = get_all_lineups(data, lineup_size, max_salary, min_salary, min_value)

    print('Fetched {n} lineups'.format(n=len(lineups)))

    diversified_lineups = diversify(lineups, name_to_max, lineup_size)

    helpers.write_csv('../lineups/{0}-{1}'.format(configs.TOURNAMENT_ID, len(diversified_lineups)), diversified_lineups,
                      [str(i) for i in range(1, lineup_size + 1)] + ['salary', 'projection', 'log_usage',
                                                                     'probability_top_10', 'probability_top_30',
                                                                     'probability_make_cut'])
