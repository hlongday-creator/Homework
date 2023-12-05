 #include <iostream>
#include <vector>
#include <algorithm>
#include <ctime>
#include <cstdlib>
#include <random>

const int numCities = 10;

int distances[numCities][numCities] = {
      {0, 29, 20, 21, 16, 31, 100, 12, 4, 31},
      {29, 0, 15, 29, 28, 40, 72, 21, 29, 41},
      {20, 15, 0, 15, 14, 25, 81, 9, 23, 27},
      {21, 29, 15, 0, 4, 12, 92, 12, 25, 13},
      {16, 28, 14, 4, 0, 16, 94, 9, 20, 16},
      {31, 40, 25, 12, 16, 0, 95, 24, 36, 3},
      {100, 72, 81, 92, 94, 95, 0, 90, 101, 99},
      {12, 21, 9, 12, 9, 24, 90, 0, 15, 25},
      {4, 29, 23, 25, 20, 36, 101, 15, 0, 35},
      {31, 41, 27, 13, 16, 3, 99, 25, 35, 0}
};

const int populationSize = 100;
const int maxGenerations = 1000;
const double crossoverRate = 0.7;
const double mutationRate = 0.2;

struct Individual {
    std::vector<int> tour;
    int fitness;
};

std::vector<Individual> initializePopulation();
int calculateFitness(const Individual& individual);
Individual selectBestIndividual(const std::vector<Individual>& population);
std::vector<Individual> evolvePopulation(std::vector<Individual> population);

int main() {
    srand(static_cast<unsigned int>(time(0)));

    std::vector<Individual> population = initializePopulation();
    for (int generation = 1; generation <= maxGenerations; ++generation) {
        for (Individual& individual : population) {
            individual.fitness = calculateFitness(individual);
        }

        Individual bestIndividual = selectBestIndividual(population);
        std::cout << "Generation " << generation << ": Best Tour = ";
        for (int city : bestIndividual.tour) {
            std::cout << city << " ";
        }
        std::cout << "Cost = " << bestIndividual.fitness << std::endl;

        population = evolvePopulation(population);

        // Sau khi hoàn thành di truyền, tính lại fitness cho tất cả cá thể trong quần thể
        for (Individual& individual : population) {
            individual.fitness = calculateFitness(individual);
        }

        // Vẽ đường đi của cá thể tốt nhất dưới dạng biểu đồ ASCII
        std::cout << "Best Tour: ";
        for (int i = 0; i < numCities; ++i) {
            int city = bestIndividual.tour[i];
            std::cout << city << " ";
            if (i < numCities - 1) {
                std::cout << " -> ";
            }
        }
        std::cout << " -> " << bestIndividual.tour[0] << std::endl;
    }

    Individual bestIndividual = selectBestIndividual(population);
    std::cout << "Best Tour: ";
    for (int city : bestIndividual.tour) {
        std::cout << city << " ";
    }
    std::cout << "Cost = " << bestIndividual.fitness << std::endl;

    return 0;
}

std::vector<Individual> initializePopulation() {
    std::vector<Individual> population;
    for (int i = 0; i < populationSize; ++i) {
        std::vector<int> tour;
        for (int j = 0; j < numCities; ++j) {
            tour.push_back(j);
        }

        std::random_device rd;
        std::mt19937 g(rd());
        std::shuffle(tour.begin(), tour.end(), g);

        population.push_back({tour, 0});
    }
    return population;
}

int calculateFitness(const Individual& individual) {
    int totalDistance = 0;
    for (int i = 0; i < numCities - 1; ++i) {
        int city1 = individual.tour[i];
        int city2 = individual.tour[i + 1];
        totalDistance += distances[city1][city2];
    }
    totalDistance += distances[individual.tour[numCities - 1]][individual.tour[0]];
    return totalDistance;
}

Individual selectBestIndividual(const std::vector<Individual>& population) {
    Individual best = population[0];
    for (const Individual& individual : population) {
        if (individual.fitness < best.fitness) {
            best = individual;
        }
    }
    return best;
}

// Define the mutate function here, outside of any other functions
void mutate(Individual& individual) {
    if (rand() / static_cast<double>(RAND_MAX) < mutationRate) {
        int index1 = rand() % numCities;
        int index2 = rand() % numCities;
        std::swap(individual.tour[index1], individual.tour[index2]);
    }
}

std::vector<Individual> evolvePopulation(std::vector<Individual> population) {
    std::vector<Individual> sortedPopulation = population;
    std::sort(sortedPopulation.begin(), sortedPopulation.end(), [](const Individual& a, const Individual& b) {
        return a.fitness < b.fitness;
    });

    Individual bestIndividual = sortedPopulation[0];

    std::vector<Individual> newPopulation;
    newPopulation.push_back(bestIndividual);

    while (newPopulation.size() < populationSize) {
        if (rand() / static_cast<double>(RAND_MAX) < crossoverRate) {
            int parent1Index = rand() % populationSize;
            int parent2Index = rand() % populationSize;

            const Individual& parent1 = sortedPopulation[parent1Index];
            const Individual& parent2 = sortedPopulation[parent2Index];

            int crossoverPoint = rand() % numCities;
            std::vector<int> childTour1(numCities, -1);
            std::vector<int> childTour2(numCities, -1);
            for (int i = 0; i < crossoverPoint; ++i) {
                childTour1[i] = parent1.tour[i];
                childTour2[i] = parent2.tour[i];
            }
            int remaining1 = 0;
            int remaining2 = 0;
            for (int i = 0; i < numCities; ++i) {
                if (std::find(childTour1.begin(), childTour1.end(), parent2.tour[i]) == childTour1.end()) {
                    childTour1[crossoverPoint + remaining1] = parent2.tour[i];
                    ++remaining1;
                }
                if (std::find(childTour2.begin(), childTour2.end(), parent1.tour[i]) == childTour2.end()) {
                    childTour2[crossoverPoint + remaining2] = parent1.tour[i];
                    ++remaining2;
                }
            }

            newPopulation.push_back({childTour1, 0});
            newPopulation.push_back({childTour2, 0});
        }

        for (int i = 1; i < newPopulation.size(); ++i) {
            mutate(newPopulation[i]);
        }
    }

    return newPopulation;
}
