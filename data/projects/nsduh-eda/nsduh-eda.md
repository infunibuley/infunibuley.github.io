nsduh-eda
# National Survey on Drug Use and Health (NSDUH) Exploratory Data Analysis

<!-- description -->
An Exploratory Data Analysis on national mental health and substance use data looking at differences in culture and groups. 

## Table of Contents

- [1. Napkin Blueprints](#1-napkin-blueprints)
- [2. Ancient Scrolls](#2-ancient-scrolls)
  - [Relevant Research](#literature-review--theoretical-background)
  - [US 2024 Population Baselines](#us-2024-data)
  - [SAMHSA NSDUH Data & Methodology](#samhsa-nsduh-data)
  - [References](#references)
- [3. Calling All Echoes](#3-calling-all-echoes)
- [4. Cranking the Dials](#4-cranking-the-dials)
- [5. The Final Verdict](#5-the-final-verdict)

## 1. Napkin Blueprints

Mental Health Data: there's the idea that different cultures have different mental health stigmas. (I'm asian, I can attest to at least the feeling)

What's the gap between needing help vs. actually receiving it across different races/incomes/genders/age brackets?

Disparities in marginalized communities:
- What is the sample size for different respondent groups in that year's dataset?
- If sample sizes allow, are there any unique mental health hurdles sexual and gender minority groups face compared to general population baselines? 
- Are queer people able to access affirming mental health support at the same rate? Are there massive barriers in treatment? What about different cultures? Genders (mostly looking at men)? 

Age & Substance use:
- Are younger people more proactive about getting therapy? Are they older? Is there an age group that is at all? 
- Generational differences in substance use vs. abuse patterns?
- Correlations between socio-economic stressors and substances as a coping mechanism?

Will probably make different groupings based on multiple demographic aspects. 

idk this is a fun dataset

## 2. Ancient Scrolls

### Relevant Research/Readings

*Rajagopal, S. K., & Durkee, M. I. (2024). Internalizing the model minority myth: Dangers for Asian American mental health and attitudes towards other minorities. Social and Personality Psychology Compass, 18(5). https://doi.org/10.1111/spc3.12959*

*Lipson, S. K., Zhou, S., Abelson, S., Heinze, J., Jirsa, M., Morigney, J., Patterson, A., Singh, M., & Eisenberg, D. (2022). Trends in college student mental health and help-seeking by race/ethnicity: Findings from the national healthy minds study, 2013–2021. Journal of Affective Disorders, 306(1), 138–147. https://doi.org/10.1016/j.jad.2022.03.038*

*Dworakowska, J. (2026). Men’s mental health in the context of hegemonic norms of masculinity: A developmental and interdisciplinary literature review. Kwartalnik Naukowy Fides Et Ratio, 65(1), 74-82. https://doi.org/10.34766/0v5em641*

*Gupta, M., Madabushi, J. S., & Gupta, N. (2023). Critical overview of patriarchy, its interferences with psychological development, and risks for mental health. Cureus, 15(6). https://doi.org/10.7759/cureus.40216*

*Lee, H., Abramson, J. R., Bhoja, A., Watson, R. J., & Mereish, E. H. (2025). Mental Health and Care Utilization Among Sexual and Gender Minority Youth by Race and Ethnicity. Journal of Adolescent Health. https://doi.org/10.1016/j.jadohealth.2024.11.244*

*Frost, D. M., & Meyer, I. H. (2023). Minority stress theory: Application, critique, and continued relevance. Current Opinion in Psychology, 51. https://doi.org/10.1016/j.copsyc.2023.101579*

*Abdullah Alkhawaldeh, ALBashtawy, M., Rayan, A., Asem Abdalrahim, Musa, A. S., Eshah, N. F., Abdallah Abu Khait, Qaddumi, J., Khraisat, O., & Sa’d ALBashtawy. (2023). Application and Use of Andersen’s Behavioral Model as Theoretical Framework: A Systematic Literature Review from 2012–2021. Iranian Journal of Public Health, 52(7). https://doi.org/10.18502/ijph.v52i7.13236*

<br>

### US 2024 Data

**Sex Distribution:**

*United States Census Bureau. (2024). QuickFacts: United States. Census Bureau QuickFacts; United States Census Bureau. https://www.census.gov/quickfacts/fact/table/US/PST045224*

| Female | Male |
| -------- | -------- |
| 50.4% | 49.6% |

<br>

**Race/Ethnicity Distribution:**

*United States Census Bureau. (2024). Annual Estimates of the Resident Population by Sex, Race, and Hispanic Origin for the United States: April 1, 2020 to July 1, 2024 (NC-EST2024-SR11H). U.S. Census Bureau, Population Division. https://www.census.gov/programs-surveys/popest.html*

| Race | Population |
| -------- | -------- |
| White, not Hispanic | 191.45M |
| Hispanic, any race | 66.52M |
| Black or African American, not Hispanic | 42.10M |
| Asian, not Hispanic | 20.61M |
| Two or more races, not Hispanic | 10.45M |
| Native American and Alaska Native, not Hispanic | 2.41M |
| Pacific Islander, not Hispanic | 0.69M |

<br>

**Age Distribution:**

*United States Census Bureau. (2024). Annual Estimates of the Resident Population for Selected Age Groups by Sex for the United States: April 1, 2020 to July 1, 2024 (NC-EST2024-AGESEX). U.S. Census Bureau, Population Division. https://www.census.gov/programs-surveys/popest.html*

| Age | Population |
| -------- | -------- |
| Under 18 | 72.48M |
| 18-24 | 30.65M |
| 25-44 | 90.62M |
| 45-64 | 80.95M |
| 65+ | 60.23M |

<br>

**Income Distribution:**

*Shrider, E. A., & Creamer, J. (2024, September). Income in the United States: 2023 / Current Population Reports (P60-282; Table A-1: Households by Total Money Income). U.S. Census Bureau. https://www.census.gov/library/publications/2024/demo/p60-282.html*

| Income | % |
| -------- | -------- |
| Under $15,000 | 8.1% |
| $15,000 to $24,999 | 6.4% |
| $25,000 to $34,999 | 6.8% |
| $35,000 to $49,999 | 9.7% |
| $50,000 to $74,999 | 15.1% |
| $75,000 to $99,999 | 11.8% |
| $100,000 to $149,999 | 16.4% |
| $150,000 to $199,999 | 9.9% |
| $200,000 and over | 15.8% |

<br>

**LGBTQIA+ Distribution:**

*Jones, J. M. (2024, March 13). LGBTQ+ Identification in the U.S. Now at 7.6%. Gallup. https://news.gallup.com/poll/611864/lgbtq-identification-adults-up.aspx*

LGBTQ+ Identity Among U.S. Adults and LGBTQ+ Adults, 2024

|  | U.S adults % | LGBTQ+ adults % |
| -------- | -------- | -------- |
| Lesbian | 1.2 | 13.9 |
| Gay | 1.4 | 18.1 |
| Bisexual | 4.4 | 57.3 |
| Transgender | 0.9 | 11.8 |
| Other LGBTQ+ (vol.) | 0.6 | 7.9 |

U.S. Adults' Self-Identification as LGBTQ+, by Age

| Age | U.S. adults % |
| -------- | -------- |
| 18 to 29 (Gen Z adults) | 22.3 |
| 30 to 46 (Millennials) | 9.8 |
| 47 to 58 (Gen X) | 4.5 |
| 59 to 77 (Baby Boomers) | 2.3 |
| 78 and older (Silent Generation) | 1.1 |

<br>

### SAMHSA NSDUH Data 

#### General Overview of data

*Center for Behavioral Health Statistics and Quality. (2025). 2024 National Survey on Drug Use and Health: Public use file data users’ guide. https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health*

*Note: The data is not stored anywhere in this git repository since it is too large. If you would like access to the data, go to the site above. The dataset is public access and I am using the 2025 tab delimited data.*

All SAMHSA data is open source. If you go to the github folder and open the path 'about the data (by SAMHSA)' or the website above, it will have the codebook, user manual, and the questionnaires that respondents filled out. 

I am using the 2024 dataset which is the most recent publicly available dataset. The data is collected through in-person interviews in people's homes and web-based interviews of people 12 years and older. A limitation of this dataset is that it doesn't include people experiencing homelessness who are not in shelters, active military personnel, and residents of jails, nursing homes, mental institutions, and long-term care hospitals. 

The data has been deidentified before being made public to protect respondents' privacy. 

SAMHSA has annual reports, the most recent one published is a 2025 report with infographics, detailed tables, etc. 

Another possible limitation I'm seeing while looking through the codebook is that many of the subjective range based questions (Such as questions asking about the level of difficulty in performing a task such as seeing, hearing, remember, etc.) only have 3 possible answers: no difficulty, some difficulty, and a lot of difficulty or cannot do at all. This is very subjective data and has a very small range of allowance and does not separate a lot of difficulty to cannot do at all. 

I also wonder if there was any level of fatigue by the end of this questionnaire (probably was) and how that might have affected the responses.

I also wonder if there was any extent of bias in responses based on discomfort. The information the respondents are giving are incredibly personal details, even though it's on paper and is not going to be linked to that person at all in the end. There is the chance that people who are against seeing mental health guidance or either give incorrect responses or simply don't participate. 

Another possible limitation is that the data was collected all at once, meaning there could be bias about past experiences or general forgetfulness over the past. 

I also do find it interesting that the dataset doesn't include measures of neurodiversity, although it does include a question on disability. 

This survey also doesn't in any way determine causation versus correlation so determining root causes would be difficult with this data. 

<br>

#### Questionnaire Resources

*SAMHSA Center for Behavioral Health Statistics and Quality (no date) 2025 National Survey on Drug Use and Health (NSDUH):Methodological Summary and Definitions, 2025 National Survey on Drug Use and Health (NSDUH): Methodological Summary and Definitions. Available at: https://www.samhsa.gov/data/sites/default/files/reports/rpt57377/2025-nsduh-method-summary-defs/2025-nsduh-method-summary-defs.htm#2-2 (Accessed: 24 September 2026).*

To measure mental health and substance abuse, they use official criteria to build the questions. 

Substance Use Disorder for Drugs and Alcohol: 
"SUD estimates for drugs and alcohol in the 2025 NSDUH were based on the criteria in the Diagnostic and Statistical Manual of Mental Disorders, 5th edition (DSM‑5; American Psychiatric Association, 2013). Respondents were asked SUD questions separately for any drugs or alcohol they used in the 12 months prior to the survey."

Clinical Measurement of Mental Illness in the MICS:
"Mental illness was measured in the MICS clinical interviews using an adapted version of the Structured Clinical Interview for the DSM‑5, Research Version, Non‐patient Edition (SCID‑5‑RV; First et al., 2015) and was differentiated by the level of functional impairment based on the Global Assessment of Functioning (GAF) scale (Endicott et al., 1976).62 Clinical interviewers assessed respondents for specific past year mental health disorders using the SCID."

Psychological Distress (K6):
"All adult respondents aged 18 or older who completed the NSDUH interview were asked to report their level of psychological distress using the K6."

Functional Impairment Due to Psychological Distress (WHODAS):
"All adult NSDUH respondents with a K6 score of 1 or higher63 were routed to an adapted version of the WHODAS to measure their level of functional impairment. The WHODAS was modified for use in a general population survey such as NSDUH by making minor changes to question wording and reducing its length (Novak, 2007). A subset of eight items was found to capture the information represented in the full 16‑item scale with no significant loss of information (Novak et al., 2010)."

Symptoms of Generalized Anxiety Disorder:
"Since 2024, the seven‐item generalized anxiety disorder (GAD‑7) screener has been included in the youth experiences section of the questionnaire for adolescents aged 12 to 17 and in the mental health section for adults aged 18 or older. The GAD‑7 is a validated self‐report measure to screen for GAD and assess the severity of symptoms of GAD in the past 2 weeks (Spitzer et al., 2006). Symptoms of GAD include feeling nervous or on edge, excessively worrying about different things, having difficulty controlling thoughts of worry, having trouble relaxing, being restless, feeling irritable, and feeling that something awful might happen."

Major Depressive Episode (Depression):
"Two sections related to MDE were included in the 2025 questionnaire: an adult depression section and an adolescent depression section. These sections were originally derived from DSM‑IV criteria for MDE and remained applicable to the more recent DSM‑5 criteria. Consistent with the DSM‑5 criteria, NSDUH does not exclude MDEs occurring exclusively in the context of bereavement. In addition, no exclusions were made for MDEs caused by medication, alcohol, illicit drugs, or any medical illness."

I do believe in the dataset, the responses are scored and we are not given the individual responses. I'm not upset about this so much. 

Because I am most interested in mental health rather than substance abuse, I'm not including many mentions of substance abuse and access measures, but all of the information is also available on the SAMHSA documents. 

Also please do not take the snippets I added as if it is a comprehensive summary of the document. There is so much more in that document, I only took what I could see and thought was most interesting. 

<br>

### References

*Center for Behavioral Health Statistics and Quality. (2025). 2024 National Survey on Drug Use and Health: Public use file data users’ guide. https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health*

*SAMHSA Center for Behavioral Health Statistics and Quality (no date) 2025 National Survey on Drug Use and Health (NSDUH):Methodological Summary and Definitions, 2025 National Survey on Drug Use and Health (NSDUH): Methodological Summary and Definitions. Available at: https://www.samhsa.gov/data/sites/default/files/reports/rpt57377/2025-nsduh-method-summary-defs/2025-nsduh-method-summary-defs.htm#2-2 (Accessed: 24 September 2026).*

*United States Census Bureau > Communications Directorate - Center for New Media and Promotion. (2025). QuickFacts: United States. Census Bureau QuickFacts; United States Census Bureau. https://www.census.gov/quickfacts/fact/table/US/PST045225*

*USAFacts. (2026, March 4). How many people live in the US? USAFacts. https://usafacts.org/answers/how-many-people-live-in-the-us/country/united-states/*

*USAFacts. (2026, March 4). How many people live in the US? USAFacts. https://usafacts.org/answers/how-many-people-live-in-the-us/country/united-states/*

*Caporal, J. (2020, February 19). Are You Well-Paid? Compare Your Salary to the Average U.S. Income. The Motley Fool. https://www.fool.com/money/research/average-us-income/*

*Jones, J. (2021, March 3). What Percentage of Americans Are LGBT? Gallup.Com. https://news.gallup.com/poll/332522/percentage-americans-lgbt.aspx*

*Rajagopal, S. K., & Durkee, M. I. (2024). Internalizing the model minority myth: Dangers for Asian American mental health and attitudes towards other minorities. Social and Personality Psychology Compass, 18(5). https://doi.org/10.1111/spc3.12959*

*Lipson, S. K., Zhou, S., Abelson, S., Heinze, J., Jirsa, M., Morigney, J., Patterson, A., Singh, M., & Eisenberg, D. (2022). Trends in college student mental health and help-seeking by race/ethnicity: Findings from the national healthy minds study, 2013–2021. Journal of Affective Disorders, 306(1), 138–147. https://doi.org/10.1016/j.jad.2022.03.038*

*Dworakowska, J. (2026). Men’s mental health in the context of hegemonic norms of masculinity: A developmental and interdisciplinary literature review. Kwartalnik Naukowy Fides Et Ratio, 65(1), 74-82. https://doi.org/10.34766/0v5em641*

*Gupta, M., Madabushi, J. S., & Gupta, N. (2023). Critical overview of patriarchy, its interferences with psychological development, and risks for mental health. Cureus, 15(6). https://doi.org/10.7759/cureus.40216*

*Lee, H., Abramson, J. R., Bhoja, A., Watson, R. J., & Mereish, E. H. (2025). Mental Health and Care Utilization Among Sexual and Gender Minority Youth by Race and Ethnicity. Journal of Adolescent Health. https://doi.org/10.1016/j.jadohealth.2024.11.244*

*Frost, D. M., & Meyer, I. H. (2023). Minority stress theory: Application, critique, and continued relevance. Current Opinion in Psychology, 51. https://doi.org/10.1016/j.copsyc.2023.101579*

*Abdullah Alkhawaldeh, ALBashtawy, M., Rayan, A., Asem Abdalrahim, Musa, A. S., Eshah, N. F., Abdallah Abu Khait, Qaddumi, J., Khraisat, O., & Sa’d ALBashtawy. (2023). Application and Use of Andersen’s Behavioral Model as Theoretical Framework: A Systematic Literature Review from 2012–2021. Iranian Journal of Public Health, 52(7). https://doi.org/10.18502/ijph.v52i7.13236*

## 3. Calling All Echoes
N/A

## 4. Cranking the Dials
N/A

## 5. The Final Verdict
N/A